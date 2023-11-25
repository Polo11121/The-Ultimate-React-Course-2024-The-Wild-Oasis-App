import { FocusEvent } from "react";
import { getSettings } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Form, FormRow, Input, Spinner } from "@/ui";
import { useUpdateSettings } from "@/features/settings";
import { Tables } from "@/utils";

export const UpdateSettingsForm = () => {
  const {
    data: {
      breakfastPrice,
      maxBookingLength,
      maxGuestsPerBooking,
      minBookingLength,
    } = {},
    isLoading: isSettingsLoading,
    isStale,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  const { mutate, isPending } = useUpdateSettings();

  const isLoading = isSettingsLoading || isPending || isStale;

  if (isLoading) {
    return <Spinner />;
  }

  const updateHandler = (event: FocusEvent<HTMLInputElement, Element>) => {
    const updatedSettings = {
      [event.target.id]: Number(event.target.value),
    } as unknown as Tables<"settings">;

    return mutate(updatedSettings);
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          disabled={isLoading}
          defaultValue={minBookingLength}
          onBlur={updateHandler}
          key={`minBookingLength-${minBookingLength}`}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          disabled={isLoading}
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          onBlur={updateHandler}
          key={`maxBookingLength-${maxBookingLength}`}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          disabled={isLoading}
          id="maxGuestsPerBooking"
          defaultValue={maxGuestsPerBooking}
          onBlur={updateHandler}
          key={`maxGuestsPerBooking-${maxGuestsPerBooking}`}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          disabled={isLoading}
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          onBlur={updateHandler}
          key={`breakfastPrice-${breakfastPrice}`}
        />
      </FormRow>
    </Form>
  );
};
