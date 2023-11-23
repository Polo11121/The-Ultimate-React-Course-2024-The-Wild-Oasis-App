import { deleteCabin } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin successfully deleted");
    },
    onError: (error) => toast.error(error.message),
  });
};
