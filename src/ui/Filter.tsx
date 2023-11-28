import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const FilterContainer = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<{
  $active?: boolean;
}>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;
  text-transform: capitalize;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

type FilterProps = {
  filterField: string;
  options: {
    label: string;
    value: string;
  }[];
};

export const Filter = ({ filterField, options }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterValue = searchParams.get(filterField) || options[0].value;

  const setUrlHandler = (url: string) => {
    searchParams.set(filterField, url);
    setSearchParams(searchParams);
  };

  return (
    <FilterContainer>
      {options.map(({ label, value }) => (
        <FilterButton
          disabled={value === filterValue}
          key={value}
          $active={value === filterValue}
          onClick={() => setUrlHandler(value)}
        >
          {label}
        </FilterButton>
      ))}
    </FilterContainer>
  );
};
