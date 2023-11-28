import { getBookings } from "@/services";
import { PAGE_SIZE } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useGetBookings = (pageSize = PAGE_SIZE) => {
  const queryClient = useQueryClient();
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

  const pageCount = data?.count ? Math.ceil((data.count || 0) / pageSize) : 1;

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1, pageSize }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sort, page: page - 1, pageSize }),
    });
  }

  return { data: data?.data, count: data?.count || 0, isLoading, error };
};
