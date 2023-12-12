import { FormEvent, useState } from "react";
import { Button, FileInput, Form, FormRow, Input } from "@/ui";
import { useGetCurrentUser, useUpdateUser } from "@/features/authentication";

export const UpdateUserDataForm = () => {
  const { data: user } = useGetCurrentUser();
  const { mutate, isPending } = useUpdateUser();
  const { user_metadata, email } = user || {};

  const [fullName, setFullName] = useState(user_metadata?.fullName);
  const [avatar, setAvatar] = useState<File | null | undefined>(null);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fullName) return;
    mutate(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          (event.target as HTMLFormElement).reset();
        },
      }
    );
  };

  const changFullNameHandler = (event: FormEvent<HTMLInputElement>) =>
    setFullName(event.currentTarget.value);

  const changeAvatarHandler = (event: FormEvent<HTMLInputElement>) =>
    setAvatar(event?.currentTarget?.files?.[0]);

  const cancelHandler = () => {
    setAvatar(null);
    setFullName(user_metadata?.fullName);
  };

  return (
    <Form onSubmit={submitHandler}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          disabled={isPending}
          type="text"
          value={fullName}
          onChange={changFullNameHandler}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          disabled={isPending}
          id="avatar"
          accept="image/*"
          onChange={changeAvatarHandler}
        />
      </FormRow>
      <FormRow>
        <>
          <Button
            onClick={cancelHandler}
            type="reset"
            variation="secondary"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button disabled={isPending}>Update account</Button>
        </>
      </FormRow>
    </Form>
  );
};
