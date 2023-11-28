import { getBookings } from "@/services";
import { PAGE_SIZE } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useGetBookings = (pageSize = PAGE_SIZE) => {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const page = Number(searchParams.get("page")) || 1;
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings", filterValue, sortBy, page],
    queryFn: () => getBookings({ filter, sort, page, pageSize }),
  });

  return { data: data?.data, count: data?.count || 0, isLoading, error };
};
