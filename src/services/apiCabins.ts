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

export const createEditCabin = async (
  cabin: Omit<Tables<"cabins">, "id" | "createdAt" | "image"> & {
    image?: File | string;
    id?: number;
  }
) => {
  const query = supabase.from("cabins");
  const { image, ...cabinWithoutImage } = cabin;
  const isImageUrl = typeof image === "string";

  const imageName = isImageUrl
    ? null
    : replaceAll(`${Math.random()}-${image?.name}`, "/", "");

  const imagePath = isImageUrl
    ? image
    : `${env.VITE_SUPABASE_URL}/storage/v1/object/public/cabins/${imageName}`;

  const newCabin = imagePath
    ? { ...cabin, image: imagePath }
    : cabinWithoutImage;

  const { data, error } = (
    cabin.id
      ? await query.update(newCabin).eq("id", cabin.id)
      : await query.insert(newCabin)
  ) as PostgrestSingleResponse<Tables<"cabins">>;

  if (error) {
    console.log(error.message);

    throw new Error(
      error.message || error.details || "Cabin could not be created"
    );
  }

  if (!imageName || !image) {
    return;
  }

  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, image, {
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
