import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import classes from "./Paper.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import Button from "@mui/material/Button";

export default function SimplePaper() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",

        "& > :not(style)": {
          m: "10px 0px",
          width: "35rem",
          height: "5.8rem",
        },
      }}
    >
      <Paper elevation={3}>
        <div className={classes.container}>
          <div className={classes.colorstrip}></div>
          <div className={classes.head}>
            <div>Account Name</div>
            <small>
              Default Queue: <span>EV Queue - Support</span>
            </small>
          </div>
        </div>
      </Paper>

      <Paper elevation={3}>
        <div className={classes.container2}>
          <SvgIcon color="success" sx={{ fontSize: "3.5rem" }}>
            <CheckCircleOutlinedIcon />
          </SvgIcon>

          <div className={classes.head1}>
            <div className={classes.title}>
              Routing: <span className={classes.span1}>Contact Center</span>
            </div>
            <small>Not in failover.</small>
          </div>
          <div>
            <Button variant="contained" color="error">
              Trigger Failover
            </Button>
          </div>
        </div>
      </Paper>
    </Box>
  );
}
