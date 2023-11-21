import { FormEvent, useState } from "react";
import { Button, FileInput, Form, Row, Input } from "@/ui";
import { useUser } from "@/services";

export const UpdateUserDataForm = () => {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const changFullNameHandler = (event: FormEvent<HTMLInputElement>) =>
    setFullName(event.currentTarget.value);

  const changeAvatarHandler = (event: FormEvent<HTMLInputElement>) =>
    setAvatar(event.currentTarget.files[0]);

  return (
    <Form onSubmit={submitHandler}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={changFullNameHandler}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={changeAvatarHandler}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
};
