import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    min: [6, "Email must be 6 characters long"],
    max: [50, "Email must be 50 characters long"],
  },
  password: {
    type: String,
    required: true,
    min: 3,
    select: false,
  },
});

userSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    },
  );
};

const User = mongoose.model("user", userSchema);

export default User;
