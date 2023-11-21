import { supabase } from "@/services";
import { Tables, env, replaceAll } from "@/utils";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

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
  cabin: Omit<Tables<"cabins">, "id" | "createdAt" | "image"> & { image: File }
) => {
  const imageName = replaceAll(`${Math.random()}-${cabin.image.name}`, "/", "");
  const imagePath = `${env.VITE_SUPABASE_URL}/storage/v1/object/public/cabins/${imageName}`;

  const { data, error } = (await supabase.from("cabins").insert({
    ...cabin,
    image: imagePath,
  })) as PostgrestSingleResponse<Tables<"cabins">>;

  if (error) {
    console.log(error.message);

    throw new Error(
      error.message || error.details || "Cabin could not be created"
    );
  }

  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, cabin.image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (storageError) {
    console.log(storageError.message);

    await deleteCabin(data.id);

    throw new Error(
      storageError.message || "Cabin image could not be uploaded"
    );
  }
};
