import { useState, ChangeEvent } from "react";
import { Button, Form, Input, FormRowVertical, SpinnerMini } from "@/ui";
import { useSignIn } from "@/features/authentication/useSignIn";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending } = useSignIn();

  const changeEmailHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const changePasswordHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const submitHandler = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    mutate(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <Form onSubmit={submitHandler}>
      <FormRowVertical label="Email address">
        <Input
          disabled={isPending}
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={changeEmailHandler}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          disabled={isPending}
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={changePasswordHandler}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isPending}>
          {isPending ? <SpinnerMini /> : "Login"}
        </Button>
      </FormRowVertical>
    </Form>
  );
};
