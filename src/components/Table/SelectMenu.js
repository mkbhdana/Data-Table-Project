import React from "react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectMenu(props) {
  const type = props.type;

  const menu = [
    { title: "Sales", value: "EV Queue - Sales" },
    { title: "Market", value: "EV Queue - Market" },
    { title: "Services", value: "EV Queue - Services" },
  ];

  return (
    <>
      <FormControl
        sx={{ m: 1, minWidth: 180, textAlign: "left" }}
        size="small"
        disabled={type === "EV Queue" ? false : true}
      >
        <Select
          value={props.value}
          onChange={props.onSelectMenu}
          id="demo-select-small-disabled"
          sx={{
            "&.Mui-selected": {
              backgroundColor: "turquoise",
              color: "white",
              fontWeight: 600,
            },
          }}
        >
          <MenuItem disabled defaultValue="Select">
            <em>Select</em>
          </MenuItem>
          {menu.map((item, index) => {
            return (
              <MenuItem key={index} value={item.value}>
                {item.title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}
