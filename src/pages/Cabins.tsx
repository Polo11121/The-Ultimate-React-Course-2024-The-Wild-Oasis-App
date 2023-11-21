import { useState } from "react";
import { CabinTable, CreateEditCabinForm } from "@/features/cabins";
import { Button, Heading, Row } from "@/ui";

export const Cabins = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleFormVisibilityHandler = () =>
    setIsFormOpen((prevState) => !prevState);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/ Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={toggleFormVisibilityHandler}>Add new cabin</Button>
        {isFormOpen && (
          <CreateEditCabinForm onClose={toggleFormVisibilityHandler} />
        )}
      </Row>
    </>
  );
};
