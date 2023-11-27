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
  overflow: auto;
`;

const OutletContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const AppLayout = () => (
  <AppContainer>
    <Header />
    <Sidebar />
    <Main>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </Main>
  </AppContainer>
);
