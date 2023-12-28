import { useCheckOut } from "@/features/checkInOut";
import { Button } from "@/ui";

type CheckOutButtonProps = {
  bookingId: number;
};

export const CheckOutButton = ({ bookingId }: CheckOutButtonProps) => {
  const { mutate, isPending } = useCheckOut();

  const checkOutHandler = () => mutate(bookingId);

  return (
    <Button
      variation="primary"
      size="small"
      onClick={checkOutHandler}
      disabled={isPending}
    >
      Check out
    </Button>
  );
};
