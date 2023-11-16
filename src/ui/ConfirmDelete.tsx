import styled from "styled-components";
import { Heading, Button } from "@/ui";

type ConfirmDeleteProps = {
  resourceName: string;
  onConfirm: () => void;
  disabled: boolean;
};

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

export const ConfirmDelete = ({
  resourceName,
  disabled,
}: ConfirmDeleteProps) => (
  <StyledConfirmDelete>
    <Heading as="h3">Delete {resourceName}</Heading>
    <p>
      Are you sure you want to delete this {resourceName} permanently? This
      action cannot be undone.
    </p>
    <div>
      <Button variation="secondary" disabled={disabled}>
        Cancel
      </Button>
      <Button variation="danger" disabled={disabled}>
        Delete
      </Button>
    </div>
  </StyledConfirmDelete>
);
