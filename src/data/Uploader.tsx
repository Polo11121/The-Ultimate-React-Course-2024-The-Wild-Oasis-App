import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import { Button } from "@/ui";
import { subtractDates } from "@/utils";
import { bookings, cabins, guests } from "@/data";
import supabase from "../services/supabase";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

const deleteGuests = async () => {
  const { error } = await supabase.from("guests").delete().gt("id", 0);

  if (error) {
    console.log(error.message);
  }
};

const deleteCabins = async () => {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);

  if (error) {
    console.log(error.message);
  }
};

const deleteBookings = async () => {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);

  if (error) {
    console.log(error.message);
  }
};

const createGuests = async () => {
  const { error } = await supabase.from("guests").insert(guests);

  if (error) console.log(error.message);
};

const createCabins = async () => {
  const { error } = await supabase.from("cabins").insert(cabins);

  if (error) {
    console.log(error.message);
  }
};

const createBookings = async () => {
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((cabin) => cabin.id);
  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0;
    const totalPrice = cabinPrice + extrasPrice;

    let status;

    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    ) {
      status = "checked-out";
    }
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    ) {
      status = "unconfirmed";
    }
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    ) {
      status = "checked-in";
    }

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);

  if (error) {
    console.log(error.message);
  }
};

export const Uploader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadAll = async () => {
    setIsLoading(true);

    await deleteBookings();
    await deleteGuests();
    await deleteCabins();
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  };

  const uploadBookings = async () => {
    setIsLoading(true);

    await deleteBookings();
    await createBookings();

    setIsLoading(false);
  };

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>
      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>
      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
};
