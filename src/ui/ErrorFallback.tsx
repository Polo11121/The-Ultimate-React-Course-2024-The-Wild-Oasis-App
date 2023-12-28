import styled from "styled-components";
import { Button, Heading } from "@/ui";
import { GlobalStyles } from "@/styles";

const ErrorFallbackContainer = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const ErrorFallbackBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;

type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) => (
  <GlobalStyles>
    <ErrorFallbackContainer>
      <ErrorFallbackBox>
        <Heading as="h1">Something went wrong.</Heading>
        <p>{error.message}</p>
        <Button size="large" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </ErrorFallbackBox>
    </ErrorFallbackContainer>
  </GlobalStyles>
);
