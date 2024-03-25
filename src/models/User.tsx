import mongoose, { Schema, model } from "mongoose";

interface User {
  username: string;
  email: string;
  password: string;
  role?: "user" | "admin"; // Optional role with default
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }
});

export const User =
  mongoose.models.Todo || mongoose.model<User>("User", userSchema);
