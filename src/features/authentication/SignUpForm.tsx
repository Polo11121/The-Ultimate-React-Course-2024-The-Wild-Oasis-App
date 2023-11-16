import { Button, Form, FormRow, Input } from "@/ui";

export const SignUpForm = () => (
  <Form>
    <FormRow label="Full name" error={""}>
      <Input type="text" id="fullName" />
    </FormRow>
    <FormRow label="Email address" error={""}>
      <Input type="email" id="email" />
    </FormRow>
    <FormRow label="Password (min 8 characters)" error={""}>
      <Input type="password" id="password" />
    </FormRow>
    <FormRow label="Repeat password" error={""}>
      <Input type="password" id="passwordConfirm" />
    </FormRow>
    <FormRow>
      <Button variation="secondary" type="reset">
        Cancel
      </Button>
      <Button>Create new user</Button>
    </FormRow>
  </Form>
);
