import { signIn } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useSignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], data?.user);
      toast.success("Successfully signed in");
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });
};
