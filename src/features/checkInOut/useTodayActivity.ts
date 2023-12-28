import { getStaysTodayActivity } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useTodayActivity = () =>
  useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["todayActivity"],
  });
