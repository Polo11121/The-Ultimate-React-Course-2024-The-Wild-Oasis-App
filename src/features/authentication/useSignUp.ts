import { signUp } from "@/services";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useSignUp = () =>
  useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success(
        "Successfully created user (Please check your email for verification link)"
      );
    },
    onError: (error) => toast.error(error.message),
  });
