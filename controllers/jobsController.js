import { StatusCodes } from "http-status-codes";
import moment from "moment";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import checkPermissions from "../utils/checkPermissions.js";

// GET 🗯
const getAllJobs = async (req, res) => {
  // For the search form in all jobs
  const { status, jobType, sort, search, limit } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  // Add to the queryObject based on condition
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }
  if (search) {
    // mongoDB syntax $regex, matching letters will be returned and "i" negates the case sensitivity
    queryObject.company = { $regex: search, $options: "i" };
  }

  // Important no await
  // Only get jobs associated with the current user
  let result = Job.find(queryObject);

  // Chain sort conditions
  if (sort === "latest") {
    // - descending
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    // - ascending
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    // - ascending
    result = result.sort("position");
  }
  if (sort === "z-a") {
    // - descending
    result = result.sort("-position");
  }
  // Pagination (req.query.page is a String)
  const page = Number(req.query.page) || 1;
  // How many jobs we want back
  const numOfEntries = limit;
  // How many jobs we skip, starting from the first one
  const skipEntries = (page - 1) * limit; // 1 - 1 * 10 -> skip 0
  // Jumping to page 2 // 2 - 1 * 10 -> skip 10 items
  result = result.skip(skipEntries).limit(numOfEntries);

  const jobs = await result;

  // To get total amount of jobs despite of pagination - since it would conflict with the total amount
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

// GET 🗯
const showStats = async (req, res) => {
  // Aggregation pipeline
  let stats = await Job.aggregate([
    // 1. Gets all jobs associated with the user id
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    // 2. Group the jobs by the defined property and return the sum
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    // title will be: pending, interview or declined
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  // Aggregation pipeline in mongoDB
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      // Group by Year and month (important since months repeat)
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    // -1 returns the latest jobs first
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    // Returns the latest 6 months
    { $limit: 6 },
  ]);

  // Refactor and format monthlyApplications, frontend approach also possible
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      // moment.js counts from 0-11 in mongoDB 1-12, so we have to subtract 1
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

// POST 🗯
const createJob = async (req, res) => {
  const { position, company } = req.body;

  // Test user read only ❕
  const user = await User.findOne({ _id: req.user.userId });
  checkPermissions(req.user, user._id);

  if (!position || !company) {
    throw new BadRequestError("Please provide position and company");
  }
  // Attach the user
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// PATCH 🗯
const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position, jobLocation } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide position and company");
  }

  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`Couldn't find job with the id of ${jobId}`);
  }

  // Check permissions
  // console.log(typeof req.user.userId)
  // console.log(typeof job.createdBy)
  // req.user.userId (string) === job.createdBy(object) // not gonna work

  // Convert createdBy into a string, function in utils folder
  // Pass in entire user object incase we add role functionality and want to check ("admin", "owner", etc.)
  // Test user read only ❕
  const user = await User.findOne({ _id: req.user.userId });
  checkPermissions(req.user, user._id);
  checkPermissions(req.user, job.createdBy);

  // 1. With findOneAndUpdate (use when we don't have hooks in the model)
  // 1. The job id 2. the request body 3. options
  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    // Validators only run on properties we provide
    // If a property is not provided, it will pass the check
    // position and company are required
    runValidators: true,
  });

  // 2. Alternative with save()
  // We don't have the hook in the JobSchema, if we do, it will be triggered with save()
  // We also have to pull out all the properties to update them
  // job.position = position
  // job.company = company
  // job.jobLocation = jobLocation
  // await job.save()

  res.status(StatusCodes.OK).json({ updatedJob });
};

// DELETE 🗯
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`Couldn't find job with the id of ${jobId}`);
  }
  // Test user read only ❕
  const user = await User.findOne({ _id: req.user.userId });
  checkPermissions(req.user, user._id);
  checkPermissions(req.user, job.createdBy);
  await job.remove();
  res.status(StatusCodes.OK).json({ msg: "Job has been removed successfully" });
};

export { getAllJobs, createJob, showStats, updateJob, deleteJob };
