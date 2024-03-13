"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import axios from "axios";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
// } from "@//ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
// import { useMutation } from "react-query";

export const todoFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters."
    })
    .max(30, {
      message: "Username must not be longer than 30 characters."
    }),

  description: z.string().max(160).min(4)
});

export type TodoFormValues = z.infer<typeof todoFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<TodoFormValues> = {
  title: "test user name",
  description: "I own a computer."
};

async function createUser(data: TodoFormValues) {
  const { data: response } = await axios.post(`/api/user/create`, data);
  return response.data;
}

export default function ProfileForm() {
  const { mutate } = useMutation({ mutationFn: createUser });

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    mode: "onChange"
  });

  function onSubmit(data: TodoFormValues) {
    try {
      mutate(data);
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        )
      });

      form.reset();
    } catch (error) {
      console.log("submit-error ", error);
    }
  }

  return (
    <div className="max-w-96">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title.." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Add Todo</Button>
        </form>
      </Form>
    </div>
  );
}
