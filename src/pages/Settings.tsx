import { UpdateSettingsForm } from "@/features/settings";
import { Heading, Row } from "@/ui";

export const Settings = () => (
  <Row>
    <Heading as="h1">Update hotel settings</Heading>
    <UpdateSettingsForm />
  </Row>
);
