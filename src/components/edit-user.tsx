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
import { User } from "@/models/User";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation
} from "react-query";
import axios from "axios";
import { DialogClose } from "@radix-ui/react-dialog";

type Props = {
  data: User;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<User[], unknown>>;
};

const userFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters."
    })
    .max(30, {
      message: "Username must not be longer than 30 characters."
    }),

  bio: z.string().max(160).min(4)
});

type UserFormValues = z.infer<typeof userFormSchema>;

// This can come from your database or API.

async function updateData(newData: User) {
  const { data } = await axios.put(`/api/user/${newData._id}`, newData);
  return data;
}

export default function EditUser(props: Props) {
  const defaultValues: Partial<UserFormValues> = {
    name: props.data.name,
    bio: props.data.bio
  };

  const { mutateAsync } = useMutation(updateData);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
    mode: "onChange"
  });

  async function onSubmit(data: UserFormValues) {
    await mutateAsync({ _id: props.data._id, ...data });
    toast({
      description: "User is Updated"
    });
    props.refetch();
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
              name="name"
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
              name="bio"
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
