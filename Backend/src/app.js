import express from "express";
import authRoutes from "./routes/auth.routes.js";
import recordRoutes from "./routes/record.routes.js";
import userRoutes from "./routes/user.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// Basic route to check if the API is running

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;