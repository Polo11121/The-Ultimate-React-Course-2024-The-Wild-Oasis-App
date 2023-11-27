import { BookingTable, BookingTableOperations } from "@/features/bookings";
import { Heading, Row } from "@/ui";

export const Bookings = () => (
  <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <BookingTableOperations />
    </Row>
    <BookingTable />
  </>
);
