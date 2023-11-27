import { useSearchParams } from "react-router-dom";
import { Select } from "@/ui";

type SortByProps = {
  options: {
    label: string;
    value: string;
  }[];
};

export const SortBy = ({ options }: SortByProps) => {
  const [searchParams, setSearchPrams] = useSearchParams();
  const sortValue = searchParams.get("sortBy") || options[0].value;

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", e.target.value);
    setSearchPrams(searchParams);
  };

  return (
    <Select
      options={options}
      value={sortValue}
      onChange={changeHandler}
      type="white"
    />
  );
};
