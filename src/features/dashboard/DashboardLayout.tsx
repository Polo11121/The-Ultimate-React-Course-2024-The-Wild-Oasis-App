import styled from "styled-components";
import { useRecentBookings, useRecentStays } from "@/features/dashboard";
import { Spinner } from "@/ui";

const DashboardLayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export const DashboardLayout = () => {
  const { isLoading: isRecentBookingsLoading } = useRecentBookings();
  const { isLoading: isRecentStaysLoading } = useRecentStays();

  if (isRecentBookingsLoading || isRecentStaysLoading) {
    return <Spinner />;
  }

  return (
    <DashboardLayoutContainer>
      <div>Statistics</div>
      <div>Today`s activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </DashboardLayoutContainer>
  );
};
