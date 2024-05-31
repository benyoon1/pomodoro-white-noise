import React from "react";
import "./Logo.css";
import "../global.css";

const Logo = ({ name }) => {
  return <h1 className="logo">{name}</h1>;
};

export default Logo;
