import React from "react";
import BadgeAvatars from "./Badge";
import SimplePaper from "./Paper";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <>
      <header className={classes.header}>
        <BadgeAvatars />
        <SimplePaper />
      </header>
    </>
  );
};

export default MainHeader;
