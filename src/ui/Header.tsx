import { UserAvatar } from "@/features/authentication";
import { HeaderMenu } from "@/ui";
import styled from "styled-components";

const HeaderLayout = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2.4rem;
  justify-content: flex-end;
`;

export const Header = () => (
  <HeaderLayout>
    <UserAvatar />
    <HeaderMenu />
  </HeaderLayout>
);
