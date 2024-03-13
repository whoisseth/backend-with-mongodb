// import { User } from "@/models/Todo";
import { Todo } from "@/models/Todo";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { title, description } = reqBody;

    const newTodo = new Todo({
      title,
      description
    });

    const savedUser = await newTodo.save();
    console.log("data added", savedUser);
    return NextResponse.json({
      message: " User created successfully",
      success: true,
      savedUser,
      status: 200
    });
  } catch (error) {
    console.log(error);
  }
}
