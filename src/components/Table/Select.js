import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { blue, grey } from "@mui/material/colors";

import SelectSmall from "./SelectRadio";

export default function RowRadioButtonsGroup({ onRadio, data }) {
  const [selected, setSelected] = useState("");
  const [menuSelect, setMenuSelect] = useState("");

  const handleChange = (e) => {
    setSelected(e.target.value);
    onRadio(e);

    setMenuSelect("");
  };

  const menuSelectHandler = (e) => {
    if (selected === "EV Queue") {
      setMenuSelect(e.target.value);
      onRadio(e);
    }
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selected}
        onChange={handleChange}
        sx={{
          color: grey[400],
          display: "flex",
          gap: "2rem",
        }}
      >
        <FormControlLabel
          value="Default"
          control={
            <Radio
              sx={{
                color: grey[400],
                "&.Mui-checked": {
                  "&, & + .MuiFormControlLabel-label": {
                    color: blue[500],
                  },
                },
              }}
            />
          }
          label="Default"
          
          
        />

        <FormControlLabel
          value="EV Queue"
          
          
          control={
            <Radio
              sx={{
                color: grey[400],
                "&.Mui-checked": {
                  "&, & + .MuiFormControlLabel-label": {
                    color: blue[500],
                  },
                },
                display: "none",
              }}
            />
          }
          label="EV Queue"
        />
        <SelectSmall
          type={selected}
          value={menuSelect}
          onSelectMenu={menuSelectHandler}
        />

        <FormControlLabel
          value="Unassigned"
          control={
            <Radio
              sx={{
                color: grey[400],
                "&.Mui-checked": {
                  "&, & + .MuiFormControlLabel-label": {
                    color: blue[500],
                  },
                },
              }}
            />
          }
          label="Unassigned"
          
          
        />
      </RadioGroup>
    </FormControl>
  );
}
