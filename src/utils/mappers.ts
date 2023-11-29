import { StatusTagName, statusTagType } from "@/utils";

export const statusToTagName: Record<StatusTagName, statusTagType> = {
  unconfirmed: "blue",
  "checked-in": "green",
  "checked-out": "silver",
};
