import { AddCabin, CabinTable } from "@/features/cabins";
import { Heading, Row } from "@/ui";

export const Cabins = () => (
  <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>Filter/ Sort</p>
    </Row>
    <Row>
      <CabinTable />
      <AddCabin />
    </Row>
  </>
);
