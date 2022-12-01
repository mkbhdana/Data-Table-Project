import React from "react";
import BadgeAvatars from "./Badge";
import Card from "./Card";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <BadgeAvatars />
        <Card />
      </header>
    </>
  );
};

export default Header;
