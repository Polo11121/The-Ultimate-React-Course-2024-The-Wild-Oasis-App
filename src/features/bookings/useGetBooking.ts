import { getBooking } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetBooking = (id: number) => {
  const fetchBooking = async () => await getBooking(id);

  return useQuery({
    queryKey: ["booking", id],
    queryFn: fetchBooking,
  });
};
