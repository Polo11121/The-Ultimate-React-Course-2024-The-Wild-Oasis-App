import { TableOperations, Filter, SortBy } from "@/ui";

const filterOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "No Discount",
    value: "no-discount",
  },
  {
    label: "With Discount",
    value: "with-discount",
  },
];

const sortOptions = [
  {
    label: "name (A-Z)",
    value: "name-asc",
  },

  {
    label: "name (Z-A)",
    value: "name-desc",
  },
  {
    label: "price (low to high)",
    value: "regularPrice-asc",
  },
  {
    label: "price (high to low)",
    value: "regularPrice-desc",
  },
  {
    label: "discount (low to high)",
    value: "discount-asc",
  },
  {
    label: "discount (high to low)",
    value: "discount-desc",
  },
  {
    label: "capacity (low to high)",
    value: "maxCapacity-asc",
  },
  {
    label: "capacity (high to low)",
    value: "maxCapacity-desc",
  },
];

export const CabinTableOperations = () => (
  <TableOperations>
    <Filter filterField="discount" options={filterOptions} />
    <SortBy options={sortOptions} />
  </TableOperations>
);
