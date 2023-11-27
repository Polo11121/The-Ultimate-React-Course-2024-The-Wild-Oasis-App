import { SelectHTMLAttributes } from "react";
import styled from "styled-components";

const SelectContainer = styled.select<{
  type?: "white" | "grey";
}>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

type SelectProps = {
  options: {
    label: string;
    value: string;
  }[];
  type: "white" | "grey";
} & SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({ options, value, ...props }: SelectProps) => (
  <SelectContainer value={value} {...props}>
    {options.map(({ label, value }) => (
      <option key={value} value={value}>
        Sort by {label}
      </option>
    ))}
  </SelectContainer>
);
