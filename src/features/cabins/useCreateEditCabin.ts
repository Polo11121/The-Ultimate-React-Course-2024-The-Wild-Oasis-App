import { createEditCabin } from "@/services";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

type UseCreateEditCabinProps = {
  isEdit?: boolean;
  afterSubmit?: () => void;
};

export const useCreateEditCabin = ({
  isEdit,
  afterSubmit,
}: UseCreateEditCabinProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success(
        isEdit ? "Cabin successfully edited" : "New cabin successfully added"
      );
      afterSubmit?.();
    },
    onError: (error: Error) => toast.error(error.message),
  });
};
