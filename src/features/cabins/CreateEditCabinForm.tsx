import { Input, Form, Button, FileInput, Textarea, FormRow } from "@/ui";
import { Tables } from "@/utils";
import { useForm } from "react-hook-form";
import { useCreateEditCabin } from "@/features/cabins";

type FormValues = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList | null;
};

type CreateEditCabinFormProps = {
  cabinToEdit?: Tables<"cabins">;
  onClose: () => void;
};

const defaultValues: FormValues = {
  name: "",
  maxCapacity: 0,
  regularPrice: 0,
  discount: 0,
  description: "",
  image: null,
};

export const CreateEditCabinForm = ({
  cabinToEdit,
  onClose,
}: CreateEditCabinFormProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: cabinToEdit
      ? {
          ...cabinToEdit,
          image: null,
        }
      : defaultValues,
  });

  const { mutate, isPending } = useCreateEditCabin({
    isEdit: Boolean(cabinToEdit),
    afterSubmit: onClose,
  });

  const submitHandler = (data: FormValues) =>
    mutate({
      ...data,
      image: data.image?.[0] as File,
      id: cabinToEdit?.id,
    });

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isPending}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Max capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isPending}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity needs to be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isPending}
          {...register("regularPrice", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isPending}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= getValues().regularPrice ||
              "Discount needs to be lower than the regular price",
          })}
        />
      </FormRow>
      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isPending}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Image" error={errors?.image?.message}>
        <FileInput
          accept="image/*"
          disabled={isPending}
          {...register(
            "image",
            cabinToEdit ? {} : { required: "This field is required" }
          )}
        />
      </FormRow>
      <FormRow>
        <>
          <Button variation="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {cabinToEdit ? "Edit cabin" : "Create cabin"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
};
