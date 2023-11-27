import { getCabins } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetCabins = () =>
  useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
