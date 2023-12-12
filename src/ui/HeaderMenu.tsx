import { LogoutButton } from "@/features/authentication";
import { HiOutlineUser } from "react-icons/hi2";
import { ButtonIcon } from "@/ui";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderMenuContainer = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

export const HeaderMenu = () => {
  const navigate = useNavigate();

  const redirectToProfile = () => navigate("/account");

  return (
    <HeaderMenuContainer>
      <li>
        <ButtonIcon onClick={redirectToProfile}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <LogoutButton />
      </li>
    </HeaderMenuContainer>
  );
};
