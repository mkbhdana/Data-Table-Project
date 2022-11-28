import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ExportCustomToolbar() {
  const { data, loading } = useDemoData({
    dataSet: "Commodity",
    rowLength: 4,
    maxColumns: 6,
  });

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        {...data}
        loading={loading}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}

// function getExcel() {
//   const config = {
//     filename: "general-ledger-Q1",
//     sheet: {
//       data: []
//     }
//   };

//   const dataSet = config.sheet.data;
