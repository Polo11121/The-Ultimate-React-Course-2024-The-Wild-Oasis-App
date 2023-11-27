import { getBookings } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useGetBookings = () => {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const [sortField, sortDirection] = sortBy.split("-");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  const sort = {
    sortField,
    sortDirection,
  };

  return useQuery({
    queryKey: ["bookings", filterValue, sortBy],
    queryFn: () => getBookings({ filter, sort }),
  });
};
