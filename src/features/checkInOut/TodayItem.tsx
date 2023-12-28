import { Button, Flag, Tag } from "@/ui";
import { Tables } from "@/utils";
import { Link } from "react-router-dom";
import { CheckOutButton } from "@/features/checkInOut";
import styled from "styled-components";

const TodayItemContainer = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;
  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

type TodayItemProps = {
  activity: Tables<"bookings"> & {
    guests: Partial<Tables<"guests"> | null>;
  };
};

export const TodayItem = ({ activity }: TodayItemProps) => {
  const { id, status, guests, numNights } = activity;

  return (
    <TodayItemContainer>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={guests?.countryFlag} alt={`Flag of ${guests?.nationality}`} />
      <Guest>{guests?.fullName}</Guest>
      <div>{numNights}</div>
      {status === "unconfirmed" && (
        <Button
          type="small"
          variation="primary"
          as={Link}
          to={`/check-in/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckOutButton bookingId={id} />}
    </TodayItemContainer>
  );
};
