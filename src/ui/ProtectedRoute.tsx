import { ReactNode } from "react";
import { useGetCurrentUser } from "@/features/authentication";
import { Spinner } from "@/ui";
import { Navigate } from "react-router-dom";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

type ProtectedRouteProps = {
  children: ReactNode;
  accessFor?: "authenticated" | "unauthenticated";
};

export const ProtectedRoute = ({
  children,
  accessFor = "authenticated",
}: ProtectedRouteProps) => {
  const { isLoading, isAuthenticated } = useGetCurrentUser();

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );
  }

  if (accessFor === "authenticated" && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (accessFor === "unauthenticated" && isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};
