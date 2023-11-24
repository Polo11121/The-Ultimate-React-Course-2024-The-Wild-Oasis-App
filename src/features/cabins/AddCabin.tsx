import { useState } from "react";
import { CreateEditCabinForm } from "@/features/cabins";
import { Button, Modal } from "@/ui";

export const AddCabin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalVisibilityHandler = () =>
    setIsModalOpen((prevState) => !prevState);

  return (
    <>
      <Button onClick={toggleModalVisibilityHandler}>Add new cabin</Button>
      {isModalOpen && (
        <Modal onClose={toggleModalVisibilityHandler}>
          <CreateEditCabinForm onClose={toggleModalVisibilityHandler} />
        </Modal>
      )}
    </>
  );
};
