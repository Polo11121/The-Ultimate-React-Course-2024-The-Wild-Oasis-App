import { Button, Form, FormRow, Input, SpinnerMini } from "@/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignUp } from "@/features/authentication";

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const SignUpForm = () => {
  const { register, formState, getValues, handleSubmit, reset } =
    useForm<FormValues>();
  const { mutate, isPending } = useSignUp();

  const { errors } = formState;

  const submitHandler: SubmitHandler<FormValues> = (data) =>
    mutate(data, {
      onSettled: () => reset(),
    });

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={isPending}
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isPending}
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please enter a valid email address",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isPending}
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>
      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isPending}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <>
          <Button disabled={isPending} variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isPending} type="submit">
            {isPending ? <SpinnerMini /> : "Create new user"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
};
