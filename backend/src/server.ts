import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./infrastructure/database/mongo";

dotenv.config();
const app = express();

connectDB();
app.get("/health", (req, res) => {
  res.json({ message: "Server Running" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});