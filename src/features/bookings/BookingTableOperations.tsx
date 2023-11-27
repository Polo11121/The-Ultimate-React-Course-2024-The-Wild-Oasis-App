import { TableOperations, Filter, SortBy } from "@/ui";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "checked-out", label: "Checked out" },
  { value: "checked-in", label: "Checked in" },
  { value: "unconfirmed", label: "Unconfirmed" },
];

const sortByOptions = [
  { value: "startDate-desc", label: "Sort by date (recent first)" },
  { value: "startDate-asc", label: "Sort by date (earlier first)" },
  {
    value: "totalPrice-desc",
    label: "Sort by amount (high first)",
  },
  { value: "totalPrice-asc", label: "Sort by amount (low first)" },
];

export const BookingTableOperations = () => (
  <TableOperations>
    <Filter filterField="status" options={filterOptions} />
    <SortBy options={sortByOptions} />
  </TableOperations>
);
