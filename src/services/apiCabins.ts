import { supabase } from "@/services";
import { Tables } from "@/utils";

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

export const deleteCabin = async (id: number) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);

    throw new Error(
      error.message || error.details || "Cabin could not be deleted"
    );
  }
};

export const createCabin = async (
  cabin: Omit<Tables<"cabins">, "id" | "createdAt">
) => {
  const { error } = await supabase.from("cabins").insert(cabin);

  if (error) {
    console.log(error.message);

    throw new Error(
      error.message || error.details || "Cabin could not be created"
    );
  }
};
