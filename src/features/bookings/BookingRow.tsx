import { ConfirmAction, Menus, Modal, Table, Tag } from "@/ui";
import {
  StatusTagName,
  Tables,
  formatCurrency,
  formatDistanceFromNow,
  statusToTagName,
} from "@/utils";
import { format, isToday } from "date-fns";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "@/features/checkInOut";
import { useDeleteBooking } from "@/features/bookings";
import styled from "styled-components";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

type BookingRowProps = {
  booking: Tables<"bookings"> & {
    guests: Tables<"guests"> | null;
    cabins: Tables<"cabins"> | null;
  };
};

export const BookingRow = ({
  booking: {
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests,
    id,
    cabins,
  },
}: BookingRowProps) => {
  const { mutate: checkOutMutationFn } = useCheckOut();
  const { mutate: deleteMutationFn, isPending: isDeletePending } =
    useDeleteBooking();
  const navigate = useNavigate();

  const seeDetailsHandler = () => navigate(`/bookings/${id}`);
  const checkInHandler = () => navigate(`/check-in/${id}`);
  const checkOutHandler = () => checkOutMutationFn(id);
  const deleteBookingHandler = () => deleteMutationFn(id);

  return (
    <Table.Row>
      <Cabin>{cabins?.name}</Cabin>
      <Stacked>
        <span>{guests?.fullName}</span>
        <span>{guests?.email}</span>
      </Stacked>
      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>
      <Tag type={statusToTagName[status as StatusTagName]}>
        {status.replace("-", " ")}
      </Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button onClick={seeDetailsHandler} icon={<HiEye />}>
              See details
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                onClick={checkInHandler}
                icon={<HiArrowDownOnSquare />}
              >
                Check In
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                onClick={checkOutHandler}
                icon={<HiArrowUpOnSquare />}
              >
                Check Out
              </Menus.Button>
            )}
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete">
          <ConfirmAction
            action="delete"
            resourceName={`booking ${id}`}
            disabled={isDeletePending}
            onConfirm={deleteBookingHandler}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
};
