import { updateSetting } from "@/services";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Settings successfully updated");
    },
    onError: (error: Error) => toast.error(error.message),
  });
};
