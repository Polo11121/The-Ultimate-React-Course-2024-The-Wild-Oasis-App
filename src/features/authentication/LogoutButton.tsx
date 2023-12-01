import { ButtonIcon, SpinnerMini } from "@/ui";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "@/features/authentication";

export const LogoutButton = () => {
  const { mutate, isPending } = useLogout();

  const logoutHandler = () => mutate();

  return (
    <ButtonIcon onClick={logoutHandler} disabled={isPending}>
      {isPending ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
};
