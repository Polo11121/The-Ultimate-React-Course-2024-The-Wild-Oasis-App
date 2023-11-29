import { updateBooking } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCheckOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => updateBooking(id, { status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`),
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        });
      queryClient.invalidateQueries({});
    },
    onError: () => toast.error("There was an error while checking in"),
  });
};
