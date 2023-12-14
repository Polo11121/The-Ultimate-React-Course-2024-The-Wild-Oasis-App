import { getStaysAfterDate } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get("Last")
    ? Number(searchParams.get("Last"))
    : 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const queryData = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = queryData.data?.filter(
    ({ status }) => status === "checked-in" || status === "checked-out"
  );

  return { confirmedStays, ...queryData };
};
