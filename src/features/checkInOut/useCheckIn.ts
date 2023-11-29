import { updateBooking } from "@/services";
import { Tables } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useCheckIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      id,
      breakfast,
    }: {
      id: number;
      breakfast?: Partial<Tables<"bookings">>;
    }) =>
      updateBooking(id, { status: "checked-in", isPaid: true, ...breakfast }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`),
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        });
      queryClient.invalidateQueries({
        queryKey: ["booking", data.id],
      });
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in"),
  });
};
