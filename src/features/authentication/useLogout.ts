import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (error) => console.error(error),
  });
};
