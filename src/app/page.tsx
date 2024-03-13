"use client";

import EditUser from "@/components/edit-user";
import Loading from "@/components/loading";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { User } from "@/models/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Delete, Edit, Trash } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

async function deleteUser(id: string) {
  const response = await axios.delete(`/api/user/${id}`);
  return response.data;
}

export default function HomePage() {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });

  const { isLoading, error, data, refetch } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => fetch("/api/user").then((res) => res.json())
  });

  async function handelDelete(id: string) {
    await mutateAsync(id);
    toast({
      description: `$ This id - ${id}  User is Deleted .`
    });
    refetch();
  }

  return (
    <div className="flex items-center justify-center py-1">
      {isLoading && <Loading />}
      {data && (
        <Table>
          <TableCaption>A list of your recent Users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Bio</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d) => (
              <TableRow key={d._id}>
                <TableCell className="font-medium"> {d.name}</TableCell>
                <TableCell>{d.bio}</TableCell>
                <TableCell className="flex items-center gap-4">
                  <EditUser data={d} />

                  <Trash
                    onClick={() => handelDelete(d._id)}
                    className=" text-red-400 cursor-pointer hover:opacity-80"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
