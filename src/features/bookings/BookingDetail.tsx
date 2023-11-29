import {
  Heading,
  Tag,
  ButtonGroup,
  Button,
  ButtonText,
  Row,
  Spinner,
} from "@/ui";
import { BookingDataBox, useGetBooking } from "@/features/bookings";
import { useMoveBack } from "@/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { StatusTagName, statusToTagName } from "@/utils";
import { useCheckOut } from "@/features/checkInOut";
import styled from "styled-components";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

export const BookingDetail = () => {
  const params = useParams() as { id: string };
  const id = Number(params.id);
  const navigate = useNavigate();
  const { mutate } = useCheckOut();
  const { data: booking, isLoading } = useGetBooking(id);

  const moveBack = useMoveBack();

  if (isLoading) {
    return <Spinner />;
  }
  const { status } = booking!;

  const checkInHandler = () => navigate(`/check-in/${id}`);
  const checkOutHandler = () => mutate(id);

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {id}</Heading>
          <Tag type={statusToTagName[status as StatusTagName]}>
            {status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
      </Row>
      <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      <BookingDataBox booking={booking!} />
      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={checkInHandler}>Check In</Button>
        )}
        {status === "checked-in" && (
          <Button onClick={checkOutHandler}>Check Out</Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};
