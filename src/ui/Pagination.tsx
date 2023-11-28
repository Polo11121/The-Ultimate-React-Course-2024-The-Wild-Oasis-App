import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Paragraph = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button<{ active?: boolean }>`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
type PaginationProps = {
  count: number;
  pageSize?: number;
};

export const Pagination = ({ count, pageSize = 10 }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const totalPages = Math.ceil(count / pageSize);
  const nextPageHandler = () => {
    if (currentPage === totalPages) {
      return;
    }

    const nextPage = currentPage + 1;

    searchParams.set("page", nextPage.toString());
    setSearchParams(searchParams);
  };

  const previousPageHandler = () => {
    if (currentPage === 1) {
      return;
    }

    const previousPage = currentPage - 1;

    searchParams.set("page", previousPage.toString());
    setSearchParams(searchParams);
  };

  const startCount = (currentPage - 1) * pageSize + 1;
  const endCount = currentPage === totalPages ? count : currentPage * pageSize;

  if (totalPages === 1) {
    return null;
  }

  return (
    <PaginationContainer>
      <Paragraph>
        Showing <span>{startCount}</span> to <span>{endCount}</span> of{" "}
        <span>{count}</span> results
      </Paragraph>
      <PaginationButtons>
        <PaginationButton
          disabled={currentPage === 1}
          onClick={previousPageHandler}
        >
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          disabled={currentPage === totalPages}
          onClick={nextPageHandler}
        >
          <span>Next</span> <HiChevronRight />
        </PaginationButton>
      </PaginationButtons>
    </PaginationContainer>
  );
};
