import express from "express";
import authRoutes from "./routes/auth.routes.js";
import recordRoutes from "./routes/record.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());


// Basic route to check if the API is running

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/users", userRoutes);

export default app;