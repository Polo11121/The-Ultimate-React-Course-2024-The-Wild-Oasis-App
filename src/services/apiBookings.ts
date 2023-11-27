import { getToday } from "@/utils";
import { supabase } from "@/services";

type GetBookingsProps = {
  filter: {
    field: string;
    value: string;
    method?: string;
  } | null;
  sort: {
    sortField: string;
    sortDirection: string;
  } | null;
};
export const getBookings = async ({ filter, sort }: GetBookingsProps) => {
  let query = supabase.from("bookings").select("*, cabins(*), guests(*)");

  if (filter) {
    // @ts-expect-error unknown type
    query = query[filter.method || "eq"](filter.field, filter.value);
  }

  if (sort) {
    query = query.order(sort.sortField, {
      ascending: sort.sortDirection === "asc",
    });
  }

  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
};

export const getBooking = async (id: string) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
};

export const getBookingsAfterDate = async (date: Date) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("createdAt, totalPrice, extrasPrice")
    .gte("createdAt", date)
    .lte("createdAt", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
};

export const getStaysAfterDate = async (date: Date) => {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
};

export const getStaysTodayActivity = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("createdAt");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
};

export const updateBooking = async (id: string, obj: {}) => {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  return data;
};

export const deleteBooking = async (id: string) => {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
};
