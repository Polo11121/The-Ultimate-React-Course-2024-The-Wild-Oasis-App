// import { BookingDataBox } from "@/features/bookings";
import { ButtonGroup, Button } from "@/ui";
import { useMoveBack } from "@/hooks";
// import styled from "styled-components";

// const Box = styled.div`
//   background-color: var(--color-grey-0);
//   border: 1px solid var(--color-grey-100);
//   border-radius: var(--border-radius-md);
//   padding: 2.4rem 4rem;
// `;

export const CheckInBooking = () => {
  const moveBack = useMoveBack();

  const booking = { id: 1 };

  const {
    id: bookingId,
    // guests,
    // totalPrice,
    // numGuests,
    // hasBreakfast,
    // numNights,
  } = booking;

  const checkInHandler = () => {};

  return (
    <>
      {/* <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row> */}
      {/* <BookingDataBox booking={booking} /> */}
      <ButtonGroup>
        <Button onClick={checkInHandler}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};
