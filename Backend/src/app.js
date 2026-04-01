import express from "express";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());


// Basic route to check if the API is running

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes

app.use("/api/auth", authRoutes);

export default app;