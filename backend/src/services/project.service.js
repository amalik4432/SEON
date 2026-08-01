import ExpressError from "../Error/ExpressError.js";
import projectModel from "../models/project.model.js";

const creatProjectService = async (name, userId) => {
  if (!name) {
    throw new ExpressError(400, "Name is Required");
  }

  if (!userId) {
    throw new ExpressError(400, "userId is Required");
  }

  const newProject = new projectModel({
    name,
    users: [userId],
  });
  return newProject;
};

export default creatProjectService;
