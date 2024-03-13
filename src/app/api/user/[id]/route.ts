/** @format */

import { connectToDb } from "@/lib/db";
import { Todo } from "@/models/Todo";

import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDb();

    const todo = await Todo.findById(params.id);
    if (todo) {
      await Todo.findByIdAndDelete(todo._id);
      return NextResponse.json({
        message: `Todo ${params.id} has been deleted`
      });
    }
    return NextResponse.json(
      { message: `Todo ${params.id} not found` },
      { status: HttpStatusCode.NotFound }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await connectToDb();

    const todo = await Todo.findById(params.id);
    const body = await req.json();

    if (todo) {
      await Todo.findByIdAndUpdate(id, body);
      console.log("body-", body);
      return NextResponse.json({ body });
    }
    return NextResponse.json(
      { message: `Todo ${params.id} not found` },
      { status: HttpStatusCode.NotFound }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
