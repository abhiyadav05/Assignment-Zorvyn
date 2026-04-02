import { createAdminUser } from "../services/user.service.js";

export const createAdmin = async (req, res) => {
  try {
    const user = await createAdminUser(req.body);

    user.password = undefined;

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};