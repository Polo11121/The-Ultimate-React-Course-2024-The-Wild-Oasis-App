import { useDarkModeContext } from "@/hooks";
import styled from "styled-components";

const LogoContainer = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

export const Logo = () => {
  const { isDarkMode } = useDarkModeContext();

  return (
    <LogoContainer>
      <Img src={isDarkMode ? "logo-dark.png" : "logo-light.png"} alt="Logo" />
    </LogoContainer>
  );
};
