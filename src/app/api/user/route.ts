/** @format */
export const dynamic = "force-dynamic";

import { connectToDb } from "@/lib/db";
import { Todo } from "@/models/Todo";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDb();

    const TodoData = await Todo.find();

    return NextResponse.json(TodoData);
  } catch (error) {
    console.log("error fetching user data ", error);
  }
}
