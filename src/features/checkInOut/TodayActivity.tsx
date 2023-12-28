import { Heading, Row, Spinner } from "@/ui";
import { TodayItem, useTodayActivity } from "@/features/checkInOut";
import styled from "styled-components";

const Today = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

export const TodayActivity = () => {
  const { data: activities, isLoading } = useTodayActivity();

  return (
    <Today>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
        {isLoading ? (
          <Spinner />
        ) : activities?.length ? (
          <TodayList>
            {activities.map((activity) => (
              <TodayItem activity={activity} key={activity.id}></TodayItem>
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity today...</NoActivity>
        )}
      </Row>
    </Today>
  );
};
