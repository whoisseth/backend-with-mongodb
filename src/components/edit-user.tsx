import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Todo } from "@/models/Todo";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation
} from "@tanstack/react-query";
import axios from "axios";
import { DialogClose } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { TodoFormValues, todoFormSchema } from "@/app/create-user/page";

type Props = {
  data: Todo;
};

// type UserFormValues = z.infer<typeof todoFormSchema>;

// This can come from your database or API.

async function updateData(newData: Todo) {
  const { data } = await axios.put(`/api/user/${newData._id}`, newData);
  return data;
}

export default function EditUser(props: Props) {
  const queryClient = useQueryClient();

  const defaultValues: Partial<TodoFormValues> = {
    title: props.data.title,
    description: props.data.description
  };

  const { mutateAsync } = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange"
  });

  async function onSubmit(data: TodoFormValues) {
    await mutateAsync({ _id: props.data._id, ...data });
    toast({
      description: "User is Updated"
    });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Edit className="cursor-pointer hover:opacity-80" />
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
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
                  <FormLabel>Bio</FormLabel>
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
            <DialogClose asChild>
              <Button type="submit">Update User</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
