import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import DataGrid from "./DataGrid";

export default function Tabs() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        ".css-13xfq8m-MuiTabPanel-root": { padding: 0 },
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderColor: "white" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label="Skills"
              value="1"
              sx={{
                "&.MuiTab-root": {
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                  backgroundColor: "#eeeeee",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 4px 0px ",
                  //   minWidth: "9rem",
                  padding: "12px 60px",
                },
                "&.Mui-selected": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            />

            <Tab
              label="Agents"
              value="2"
              disabled
              sx={{
                "&.MuiTab-root": {
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                  backgroundColor: "#eeeeee",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 4px 0px",
                  padding: "12px 60px",
                },
                "&.Mui-selected": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            />
            <Tab
              label="CCRNs"
              value="3"
              disabled
              sx={{
                "&.MuiTab-root": {
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                  backgroundColor: "#eeeeee",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 4px 0px ",
                  padding: "12px 60px",
                },
                "&.Mui-selected": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <DataGrid />
        </TabPanel>
        <TabPanel value="2"></TabPanel>
        <TabPanel value="3"></TabPanel>
      </TabContext>
    </Box>
  );
}
