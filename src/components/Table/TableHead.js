import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import { visuallyHidden } from "@mui/utils";
import RowRadioButtonsGroup from "./Select";
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

function EnhancedTableHead(props) {
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
          sx={{ backgroundColor: "#f5f5f5", flexDirection: ({ header }) => {
              return header?.alignContent && header?.alignContent === "right"
                ? "row-reverse"
                : "row";
            }, }}
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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://run.mocky.io/v3/7210237f-cf0d-4fbf-baf0-1e3f1b6f4568"

        // https://designer.mocky.io/manage/delete/7210237f-cf0d-4fbf-baf0-1e3f1b6f4568/BMkCnJ7knShoAGEBf3McSqaxOqMfQEwR3XiX
      );

      const json = await response.json();

      setRows(json);
    };

    fetchData().catch(console.error);
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      console.log(1);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const exportAllSelectedRows = () => {
    const _rows = selected.map((rowData) =>
      rows
        .map((row) => {
          if (row.name === rowData) {
            return [row.name, row.id, row.assign];
          }
        })
        .filter(Boolean)
    );

    console.log(_rows, "rows");
    new CsvBuilder("tableData.csv")
      .setColumns(["Skill", "Skill ID", "FAILOVER"])
      .addRows(_rows)

      .exportFile();
  };

  const radioInputHandler = (e, id) => {
    setRows((pre) => {
      const current = pre.find((v) => v.id === id);
      current["assign"] = e.target.value;
      return [...pre];
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
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              title="Data"
              data={rows}
              columns={headCells}
              onExcel={exportAllSelectedRows}
            />

            <TableBody>
              {rows
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
            rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            showFirstButton
            showLastButton
            labelDisplayedRows={({ page }) => {
              return page + 1;
            }}
          />
          <h5 style={{ textAlign: "right" }}>Masks: {selected.length}</h5>
        </div>
      </Paper>
    </Box>
  );
}
