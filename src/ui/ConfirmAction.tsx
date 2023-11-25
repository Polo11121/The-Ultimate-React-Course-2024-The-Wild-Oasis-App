import { Heading, Button } from "@/ui";
import styled from "styled-components";

type ConfirmActionProps = {
  resourceName: string;
  action: string;
  onClose?: () => void;
  onConfirm: () => void | Promise<void>;
  disabled: boolean;
};

const StyledConfirmAction = styled.div`
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

export const ConfirmAction = ({
  resourceName,
  action,
  onConfirm,
  onClose,
  disabled,
}: ConfirmActionProps) => {
  const actionText = action.charAt(0).toUpperCase() + action.slice(1);

  const confirmHandler = async () => {
    await onConfirm();
    onClose?.();
  };

  return (
    <StyledConfirmAction>
      <Heading as="h3">
        {actionText} {resourceName}
      </Heading>
      <p>
        Are you sure you want to {action} {resourceName}?
      </p>
      <div>
        <Button variation="secondary" disabled={disabled} onClick={onClose}>
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={confirmHandler}>
          {actionText}
        </Button>
      </div>
    </StyledConfirmAction>
  );
};
