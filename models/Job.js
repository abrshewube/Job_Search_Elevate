import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: [true, "Please provide a job position"],
      maxlength: 50,
    },
    company: {
      type: String,
      required: [true, "Please provide a company"],
      maxlength: 50,
    },
    jobLocation: {
      type: String,
      default: "my city",
      required: true,
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship", "freelance"],
      default: "full-time",
    },
    status: {
      type: String,
      enum: ["pending", "interview", "declined"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide the user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
