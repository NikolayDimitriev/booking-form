import { FC } from "react";
import { data } from "./Dropdown.mock";

import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material/";

type TDropdown = {
  title: "Башня" | "Этаж" | "Переговорная";
  dataKey: "tower" | "floor" | "room";
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

export const Dropdown: FC<TDropdown> = ({
  title,
  dataKey,
  state,
  setState,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value as string);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
      <InputLabel id="tower">{title}</InputLabel>
      <Select
        labelId="tower-label"
        id="demo-simple-select"
        value={state}
        label={title}
        onChange={handleChange}
      >
        {data[dataKey].map(({ id, value }) => (
          <MenuItem key={id} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
