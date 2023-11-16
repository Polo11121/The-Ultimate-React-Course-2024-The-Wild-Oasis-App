import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "@/ui";
import styled from "styled-components";

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

export const AppLayout = () => (
  <AppContainer>
    <Header />
    <Sidebar />
    <Main>
      <Outlet />
    </Main>
  </AppContainer>
);
