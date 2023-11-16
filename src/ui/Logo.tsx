import styled from "styled-components";

const LogoContainer = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

export const Logo = () => (
  <LogoContainer>
    <Img src="logo-light.png" alt="Logo" />
  </LogoContainer>
);
