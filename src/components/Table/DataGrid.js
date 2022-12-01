import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import { visuallyHidden } from "@mui/utils";
import RowRadioButtonsGroup from "./RadioButton";
import { CsvBuilder } from "filefy";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "name",

    label: "SKILL",
  },
  {
    id: "id",

    label: "SKILL ID",
  },
];

function DataHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
      <TableRow>
        <TableCell></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="none"
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ backgroundColor: "#f5f5f5" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}

        <TableCell
          key="assign"
          align="right"
          padding="none"
          sortDirection={orderBy === "assign" ? order : false}
          sx={{
            backgroundColor: "#f5f5f5",
            flexDirection: ({ header }) => {
              return header?.alignContent && header?.alignContent === "right"
                ? "row-reverse"
                : "row";
            },
          }}
        >
          <TableSortLabel
            active={orderBy === "assign"}
            direction={orderBy === "assign" ? order : "asc"}
            onClick={createSortHandler("assign")}
          >
            FAILOVER ROUTE ASSIGNMENT
            {orderBy === "assign" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableSortLabel>
          <Tooltip
            title="Export"
            sx={{ marginLeft: "19.5rem", marginRight: "0.5rem" }}
          >
            <IconButton onClick={props.onExcel}>
              <FileDownloadOutlinedIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

DataHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function DataGrid() {
  const [state, setState] = useState({
    order: "asc",
    orderBy: "id",

    page: 0,
    rowsPerPage: 5,
    selected: [],
    rows: [],
  });

  const fetchData = async () => {
    const response = await fetch(
      "https://run.mocky.io/v3/afde719f-52cb-4f6c-b1bb-66b135e74da2"
    );

    const json = await response.json();

    setState((pre) => {
      return { ...pre, rows: json };
    });
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = state.orderBy === property && state.order === "asc";
    setState((prevState) => {
      return { ...prevState, order: isAsc ? "desc" : "asc", orderBy: property };
    });
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelected = rows.map((n) => n.name);
  //     setSelected(newSelected);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, name) => {
    const selectedIndex = state.selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(state.selected, name);
      console.log(1);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(state.selected.slice(1));
    } else if (selectedIndex === state.selected.length - 1) {
      newSelected = newSelected.concat(state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        state.selected.slice(0, selectedIndex),
        state.selected.slice(selectedIndex + 1)
      );
    }
    setState((prevState) => {
      return { ...prevState, selected: newSelected };
    });
  };

  const handleChangePage = (event, newPage) => {
    setState((prevState) => {
      return { ...prevState, page: newPage };
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10),
        page: 0,
      };
    });
  };

  const isSelected = (name) => state.selected.indexOf(name) !== -1;

  const emptyRows =
    state.page > 0
      ? Math.max(0, (1 + state.page) * state.rowsPerPage - state.rows.length)
      : 0;

  const exportAllSelectedRows = () => {
    const _rows = state.selected.map((rowData) =>
      state.rows
        .map((row) => {
          if (row.name === rowData) {
            return [row.name, row.id, row.assign];
          }
        })
        .filter(Boolean)
    );
    const _rows1 = state.rows.map((row) => {
      return [row.name, row.id, row.assign];
    });

    console.log(_rows, "rows");
    new CsvBuilder("tableData.csv")
      .setColumns(["Skill", "Skill ID", "FAILOVER"])
      .addRows(!state.selected ? _rows : _rows1)

      .exportFile();
  };

  const radioInputHandler = (e, id) => {
    setState((pre) => {
      const current = pre.rows.find((v) => v.id === id);
      current["assign"] = e.target.value;
      return { ...pre };
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{
              minWidth: 700,
              "&, .css-1owoy7t-MuiTableCell-root": { padding: "4px" },
              "&, .css-177gid-MuiTableCell-root": { padding: "6px" },
              "&, .css-1ex1afd-MuiTableCell-root": { padding: "4px" },
            }}
            aria-labelledby="tableTitle"
          >
            <DataHead
              numSelected={state.selected.length}
              order={state.order}
              orderBy={state.orderBy}
              onRequestSort={handleRequestSort}
              rowCount={state.rows.length}
              title="Data"
              data={state.rows}
              columns={headCells}
              onExcel={exportAllSelectedRows}
            />

            <TableBody>
              {state.rows
                .sort(getComparator(state.order, state.orderBy))
                .slice(
                  state.page * state.rowsPerPage,
                  state.page * state.rowsPerPage + state.rowsPerPage
                )
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row.name)}
                          sx={{
                            color: "#bdbdbd",
                          }}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.id}</TableCell>

                      <TableCell align="right">
                        <RowRadioButtonsGroup
                          onRadio={(e) => radioInputHandler(e, row.id)}
                          data={row}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 20,
          }}
        >
          <TablePagination
            rowsPerPageOptions={[
              5,
              10,
              { label: "All", value: state.rows.length },
            ]}
            component="div"
            count={state.rows.length}
            rowsPerPage={state.rowsPerPage}
            page={state.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            showFirstButton
            showLastButton
            labelDisplayedRows={({ page }) => {
              return page + 1;
            }}
          />
          <h5 style={{ textAlign: "right" }}>Masks: {state.selected.length}</h5>
        </div>
      </Paper>
    </Box>
  );
}
