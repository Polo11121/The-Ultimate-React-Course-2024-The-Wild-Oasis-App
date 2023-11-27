import { CabinRow, useGetCabins } from "@/features/cabins";
import { Tables } from "@/utils";
import { useSearchParams } from "react-router-dom";
import { Menus, Spinner, Table } from "@/ui";

export const CabinTable = () => {
  const [searchParams] = useSearchParams();
  const { data: cabins, isLoading } = useGetCabins();

  if (isLoading) {
    return <Spinner />;
  }

  const filterValue = searchParams.get("discount") || "all";
  const [sortField, sortDirection] = (
    searchParams.get("sortBy") || "price-asc"
  ).split("-");
  const sortKey = sortField as keyof Tables<"cabins">;
  const sortModifier = sortDirection === "asc" ? 1 : -1;

  const filteredCabins = cabins?.filter((cabin) => {
    if (filterValue === "no-discount") {
      return cabin.discount === 0;
    }

    if (filterValue === "with-discount") {
      return cabin.discount > 0;
    }

    return true;
  });

  const sortedCabins = filteredCabins?.sort(
    (cabinOne, cabinTwo) =>
      String(cabinOne[sortKey]).localeCompare(String(cabinTwo[sortKey])) *
      sortModifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(sortedCabins) => (
            <CabinRow key={sortedCabins.id} cabin={sortedCabins} />
          )}
        />
      </Table>
    </Menus>
  );
};
