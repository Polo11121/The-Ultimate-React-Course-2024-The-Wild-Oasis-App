import { useState } from "react";
import { Button, Form, Input, FormRowVertical } from "@/ui";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmailHandler = (event) => setEmail(event.target.value);
  const changePasswordHandler = (event) => setPassword(event.target.value);
  const submitHandler = () => {};

  return (
    <Form onSubmit={submitHandler}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={changeEmailHandler}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={changePasswordHandler}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">Login</Button>
      </FormRowVertical>
    </Form>
  );
};
