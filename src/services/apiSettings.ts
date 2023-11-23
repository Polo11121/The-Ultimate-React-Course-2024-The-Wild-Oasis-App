import { supabase } from "@/services";
import { Tables } from "@/utils";

export const getSettings = async () => {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);

    throw new Error("Settings could not be loaded");
  }

  return data;
};

export const updateSetting = async (newSetting: Tables<"settings">) => {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
};
