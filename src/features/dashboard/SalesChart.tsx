import { DashboardBox } from "@/features/dashboard";
import { Heading } from "@/ui";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkModeContext } from "@/hooks";
import { Tables } from "@/utils";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import styled from "styled-components";

const SalesChartContainer = styled(DashboardBox)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

type SalesChartProps = {
  bookings?: Partial<Tables<"bookings">>[];
  numOfDays?: number;
};

export const SalesChart = ({ bookings, numOfDays }: SalesChartProps) => {
  const { isDarkMode } = useDarkModeContext();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), (numOfDays || 0) - 1),
    end: new Date(),
  });

  const chartData = allDates.map((date) => {
    const currentBookings = bookings?.filter(({ createdAt }) =>
      isSameDay(new Date(createdAt as string), date)
    );

    return {
      label: format(date, "MMM dd"),
      totalSales: currentBookings?.reduce(
        (acc, curr) => acc + (curr?.totalPrice || 0),
        0
      ),
      extrasSales: currentBookings?.reduce(
        (acc, curr) => acc + (curr?.extrasPrice || 0),
        0
      ),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <SalesChartContainer>
      <Heading as="h2">
        Sales from {format(allDates.at(0) as Date, "MMM dd yyyy")} to{" "}
        {format(new Date(), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer height={300} width={700}>
        <AreaChart data={chartData}>
          <XAxis
            dataKey="label"
            tick={{
              fill: colors.text,
            }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{
              fill: colors.text,
            }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray={4} />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
            }}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extra sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </SalesChartContainer>
  );
};
