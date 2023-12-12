import { updateUser } from "@/services";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
      toast.success("User account successfully updated");
    },
    onError: (error: Error) => toast.error(error.message),
  });
};
