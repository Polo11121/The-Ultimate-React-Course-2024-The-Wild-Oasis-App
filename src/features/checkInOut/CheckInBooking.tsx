import { useEffect, useState } from "react";
import {
  ButtonGroup,
  Button,
  Spinner,
  Row,
  Heading,
  ButtonText,
  Checkbox,
} from "@/ui";
import { useMoveBack } from "@/hooks";
import { Navigate, useParams } from "react-router-dom";
import { BookingDataBox, useGetBooking } from "@/features/bookings";
import { formatCurrency } from "@/utils";
import { useCheckIn } from "@/features/checkInOut";
import { useGetSettings } from "@/features/settings";
import styled from "styled-components";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

export const CheckInBooking = () => {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [includeBreakfast, setIncludeBreakfast] = useState(false);
  const params = useParams() as { id: string };
  const id = Number(params.id);
  const moveBack = useMoveBack();
  const { data: booking, isLoading: isLoadingBookings } = useGetBooking(id);
  const { data: settings, isLoading: isLoadingSettings } = useGetSettings();
  const { mutate, isPending } = useCheckIn();

  useEffect(() => setConfirmPaid(Boolean(booking?.isPaid)), [booking?.isPaid]);

  if (isLoadingBookings || isLoadingSettings) {
    return <Spinner />;
  }

  if (booking?.status !== "unconfirmed") {
    return <Navigate to="bookings" />;
  }

  const { guests, numGuests, numNights, hasBreakfast, totalPrice, isPaid } =
    booking!;
  const { breakfastPrice } = settings!;

  const toggleConfirmationHandler = () =>
    setConfirmPaid((prevState) => !prevState);

  const toggleBreakfastHandler = () => {
    setIncludeBreakfast((prevState) => !prevState);
    setConfirmPaid(false);
  };

  const optionalBreakfastPrice = breakfastPrice * numNights * numGuests;

  const checkInHandler = () => {
    if (!confirmPaid) {
      return;
    }

    if (includeBreakfast) {
      mutate({
        id,
        breakfast: {
          hasBreakfast: true,
          totalPrice: totalPrice + optionalBreakfastPrice,
          extrasPrice: optionalBreakfastPrice,
        },
      });
    } else {
      mutate({ id });
    }
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking!} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            disabled={confirmPaid || isPending}
            checked={includeBreakfast}
            onChange={toggleBreakfastHandler}
            id="includeBreakfast"
          >
            Want to add breakfast for an additional{" "}
            {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          disabled={isPaid || isPending}
          checked={confirmPaid}
          onChange={toggleConfirmationHandler}
          id="confirmPaid"
        >
          I confirm that {guests?.fullName} has paid the total amount of{" "}
          {formatCurrency(
            totalPrice + (includeBreakfast ? optionalBreakfastPrice : 0)
          )}
          .
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button disabled={isPending || !confirmPaid} onClick={checkInHandler}>
          Check in booking #{id}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};
