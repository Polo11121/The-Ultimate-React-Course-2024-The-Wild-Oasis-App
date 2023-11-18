import { supabase } from "@/services";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);

    throw new Error(
      error.message || error.details || "Cabins could not be loaded"
    );
  }

  return data;
};
