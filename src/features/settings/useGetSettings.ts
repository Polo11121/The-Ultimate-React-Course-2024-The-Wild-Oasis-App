import { getSettings } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetSettings = () =>
  useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
