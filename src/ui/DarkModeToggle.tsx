import { useDarkModeContext } from "@/hooks";
import { ButtonIcon } from "@/ui";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

export const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
};
