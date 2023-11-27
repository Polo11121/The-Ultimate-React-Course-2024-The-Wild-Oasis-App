import { AddCabin, CabinTable, CabinTableOperations } from "@/features/cabins";
import { Heading, Row } from "@/ui";

export const Cabins = () => (
  <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <CabinTableOperations />
    </Row>
    <Row>
      <CabinTable />
      <AddCabin />
    </Row>
  </>
);
