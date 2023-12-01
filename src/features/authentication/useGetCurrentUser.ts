import { getCurrentUser } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });

  return { ...query, isAuthenticated: query.data?.role === "authenticated" };
};
