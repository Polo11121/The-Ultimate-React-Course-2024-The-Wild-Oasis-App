import { Tables, formatCurrency } from "@/utils";
import { Stat } from "@/features/dashboard";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

type StatsProps = {
  bookings?: Partial<Tables<"bookings">>[];
  confirmedStays?: Tables<"bookings">[];
  numOfDays?: number;
  cabinCount?: number;
};

export const Stats = ({
  bookings,
  confirmedStays,
  numOfDays = 0,
  cabinCount = 0,
}: StatsProps) => {
  const numOfBookings = bookings?.length;
  const sales = bookings?.reduce(
    (acc, curr) => acc + (curr?.totalPrice || 0),
    0
  );
  const totalCheckIns = confirmedStays?.length;
  const occupation =
    confirmedStays?.reduce((acc, curr) => acc + (curr?.numNights || 0), 0) || 0;
  const occupationRate = Math.round(
    (occupation / (numOfDays * cabinCount)) * 100
  );

  return (
    <div>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numOfBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupationRate}
      />
    </div>
  );
};
