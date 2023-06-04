import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === "62f90adc826d35f20d0382eb") {
    // If test user, display alert
    throw new BadRequestError("Test user, no touchy only looky ☝");
  }
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnAuthenticatedError("You are not authorized to access this route");
};

export default checkPermissions;
