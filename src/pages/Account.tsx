import {
  UpdateUserDataForm,
  UpdatePasswordForm,
} from "@/features/authentication";
import { Heading, Row } from "@/ui";

export const Account = () => (
  <>
    <Heading as="h1">Update your account</Heading>
    <Row>
      <Heading as="h3">Update user data</Heading>
      <UpdateUserDataForm />
    </Row>
    <Row>
      <Heading as="h3">Update password</Heading>
      <UpdatePasswordForm />
    </Row>
  </>
);
