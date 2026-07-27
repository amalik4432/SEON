import userModel from "../models/user.model.js";

const createUserService = async (email, password) => {
  let hashedPass = await userModel.hashPassword(password);
  let newUser = new userModel({
    email,
    password: hashedPass,
  });
  return newUser;
};

export { createUserService };
