import styled from "styled-components";
import { MainNav, Logo } from "@/ui";

const SidebarLayout = styled.div`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const Sidebar = () => {
  return (
    <SidebarLayout>
      <Logo />
      <MainNav />
    </SidebarLayout>
  );
};
