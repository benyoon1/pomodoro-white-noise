import React from "react";
import "./Logo.css";
import "../global.css";

function Logo({ name }) {
  return <h2 className="logo-bottom">{name}</h2>;
}

export default Logo;
