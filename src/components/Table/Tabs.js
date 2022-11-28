import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import EnhancedTable from "./TableHead";
import ExportCustomToolbar from "./GridTable";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

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
              //   disabled
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
          <EnhancedTable />
        </TabPanel>
        <TabPanel value="2">
          <ExportCustomToolbar />
        </TabPanel>
        <TabPanel value="3">CCRNs</TabPanel>
      </TabContext>
    </Box>
  );
}
