import styled from "styled-components";
import {
  DurationChart,
  SalesChart,
  Stats,
  useRecentBookings,
  useRecentStays,
} from "@/features/dashboard";
import { Spinner } from "@/ui";
import { useGetCabins } from "@/features/cabins";
import { TodayActivity } from "@/features/checkInOut";

const DashboardLayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export const DashboardLayout = () => {
  const { isLoading: isRecentBookingsLoading, data: recentBookings } =
    useRecentBookings();
  const {
    isLoading: isRecentStaysLoading,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { data: cabins, isLoading: isCabinsLoading } = useGetCabins();

  const isLoading =
    isRecentBookingsLoading || isRecentStaysLoading || isCabinsLoading;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <DashboardLayoutContainer>
      <Stats
        bookings={recentBookings}
        confirmedStays={confirmedStays}
        numOfDays={numDays}
        cabinCount={cabins?.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={recentBookings} numOfDays={numDays} />
    </DashboardLayoutContainer>
  );
};
