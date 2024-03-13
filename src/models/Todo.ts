import mongoose, { Schema } from "mongoose";

export interface Todo {
  _id: string;
  title: string;
  description: string;
}

const todoSchema = new Schema<Todo>({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

export const Todo =
  mongoose.models.Todo || mongoose.model<Todo>("Todo", todoSchema);
