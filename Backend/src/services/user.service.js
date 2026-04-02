import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const createAdminUser = async (data) => {
  const { name, email, password } = data;

  // check existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create admin
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "admin",
  });

  return user;
};