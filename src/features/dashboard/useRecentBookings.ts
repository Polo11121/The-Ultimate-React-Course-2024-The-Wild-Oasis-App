import { getBookingsAfterDate } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export const useRecentBookings = () => {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get("Last")
    ? Number(searchParams.get("Last"))
    : 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  return useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });
};
