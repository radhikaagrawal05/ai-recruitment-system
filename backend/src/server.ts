// import dotenv from "dotenv";
// dotenv.config();

// import mongoose from "mongoose";
// import { MongoUserRepository } from "./modules/auth/infrastructure/repositories/MongoUserRepository";
// import { User } from "./modules/auth/domain/entities/User";
// import { UserRole } from "./modules/auth/domain/value-objects/UserRole";

// const MONGO_URI = process.env.MONGO_URI || "";
// console.log("MONGO_URI is:", JSON.stringify(MONGO_URI));

// mongoose.connect(MONGO_URI).then(async () => {
//   console.log("✅ MongoDB connected");

//   const repo = new MongoUserRepository();

//   const testUser = new User({
//     name: "Rad Test",
//     email: "rad@test.com",
//     password: "hashedpassword123",
//     role: UserRole.HR,
//   });

//   repo.save(testUser).then((saved) => {
//     console.log("✅ User saved:", saved);
//   }).catch((err) => {
//     console.error("❌ Save error:", err);
//   });

// }).catch((err) => {
//   console.error("❌ MongoDB connection failed:", err.message);
// });
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import authRoutes from "./modules/auth/presentation/routes/authRoutes";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
// global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("❌ Unhandled error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});
// connect to MongoDB then start server
mongoose.connect(MONGO_URI).then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
});