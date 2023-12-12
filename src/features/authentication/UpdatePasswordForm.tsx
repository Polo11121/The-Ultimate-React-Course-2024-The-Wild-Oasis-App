import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Form, FormRow, Input } from "@/ui";
import { useUpdateUser } from "@/features/authentication";

type FormValues = {
  password: string;
  passwordConfirm: string;
};

export const UpdatePasswordForm = () => {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<FormValues>();
  const { mutate, isPending } = useUpdateUser();
  const { errors } = formState;

  const resetHandler = () => reset();

  const submitHandler: SubmitHandler<FormValues> = (data) =>
    mutate({ password: data.password }, { onSuccess: resetHandler });

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isPending}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isPending}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <>
          <Button onClick={resetHandler} type="reset" variation="secondary">
            Cancel
          </Button>
          <Button disabled={isPending}>Update password</Button>
        </>
      </FormRow>
    </Form>
  );
};
