import { ArrowLeft } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { Link } from "react-router-dom";
export default function CustomHeader({ title = "Settings" }) {
  return (
    <div className="Header flex space-between">
      <div className="flex">
        {/* <MenuOpenIcon onClick={handleOen}></MenuOpenIcon> */}
        {/* <ArrowLeft></ArrowLeft> */}
        <Link to="/">
          <ArrowBackIcon></ArrowBackIcon>
        </Link>
      </div>
      <div className="flex center">{title}</div>
    </div>
  );
}
