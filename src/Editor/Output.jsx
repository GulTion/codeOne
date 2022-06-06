import React from "react";
import "./_Editor.scss";
import AceEditor from "react-ace";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Drawer from "../Chemistry/Drawer";
import Drawer from "react-modern-drawer";
import { OutputOutlined } from "@mui/icons-material";

export default function Output({ output, setOut }) {
  return (
    <div className="Output flex col">
      <div
        className="Header flex space-between"
        style={{ background: !output.exception ? "" : "#ff8d8d" }}
      >
        <div className="flex">
          <ArrowBackIcon onClick={setOut}></ArrowBackIcon>
        </div>
        <div className="flex center">
          {output.loading ? "LOADING.." : `Time: ${output.executionTime}ms`}
        </div>
      </div>
      <pre className=" ace-solarized-dark ace_editor">
        {output.loading ? "LOADING.." : output.exception || output.stdout}
      </pre>
      {/* <div>input</div> */}
    </div>
  );
}
