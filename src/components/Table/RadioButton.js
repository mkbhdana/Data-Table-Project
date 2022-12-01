import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";

import SelectMenu from "./SelectMenu";

export default function RowRadioButtonsGroup({ onRadio, data }) {
  const [state, setState] = useState({
    selected: data.assign,
    menuSelect: "",
  });

  const handleChange = (e) => {
    setState({ ...state, selected: e.target.value, menuSelect: "" });
    onRadio(e);
  };

  const menuSelectHandler = (e) => {
    if (state.selected === "EV Queue") {
      setState({ ...state, menuSelect: e.target.value });
      onRadio(e);
    }
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="Default"
        value={state.selected}
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
        <SelectMenu
          type={state.selected}
          value={state.menuSelect}
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
