import { DashboardFilter, DashboardLayout } from "@/features/dashboard";
import { Row, Heading } from "@/ui";

export const Dashboard = () => (
  <>
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <DashboardFilter />
      <p>TEST</p>
    </Row>
    <DashboardLayout />
  </>
);
