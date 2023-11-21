import { useState } from "react";
import { CabinTable, CreateCabinForm } from "@/features/cabins";
import { Button, Heading, Row } from "@/ui";

export const Cabins = () => {
  const [isFromOpen, setIsFormOpen] = useState(false);

  const toggleFormHandler = () => setIsFormOpen((prevState) => !prevState);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/ Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={toggleFormHandler}>Add new cabin</Button>
        {isFromOpen && <CreateCabinForm />}
      </Row>
    </>
  );
};
