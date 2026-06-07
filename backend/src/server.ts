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