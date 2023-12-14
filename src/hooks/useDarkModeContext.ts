import { useContext } from "react";
import { DarkModeContext } from "@/contexts";

export const useDarkModeContext = () => {
  const context = useContext(DarkModeContext);

  if (context === undefined) {
    throw new Error(
      "useDarkModeContext must be used within a DarkModeProvider"
    );
  }

  return context;
};
