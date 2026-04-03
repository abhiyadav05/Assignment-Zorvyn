import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

// Connect to MongoDB
await connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});