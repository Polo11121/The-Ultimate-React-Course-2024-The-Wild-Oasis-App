import { CreateEditCabinForm } from "@/features/cabins";
import { Button, Modal } from "@/ui";

export const AddCabin = () => (
  <div>
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateEditCabinForm />
      </Modal.Window>
    </Modal>
  </div>
);
