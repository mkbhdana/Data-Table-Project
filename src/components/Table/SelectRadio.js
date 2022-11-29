import React from "react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSmall(props) {
  const type = props.type;

  return (
    <>
      <FormControl
        sx={{ m: 1, minWidth: 180, textAlign: "left", }}
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
          <MenuItem value={`${type} - Sales`}>Sales</MenuItem>
          <MenuItem value={`${type} - Market`}>Market</MenuItem>
          <MenuItem value={`${type} - Services`}>Service</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
