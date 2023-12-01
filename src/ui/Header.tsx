import { LogoutButton } from "@/features/authentication";
import styled from "styled-components";

const HeaderLayout = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Header = () => (
  <HeaderLayout>
    <LogoutButton />
  </HeaderLayout>
);
