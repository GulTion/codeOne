import React from "react";
// import DeleteIcon from "@mui/icons-material/Delete"
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import Drawe from "react-modern-drawer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FExplorer from "./FExplorer";
import "react-modern-drawer/dist/index.css";
import SaveIcon from "@mui/icons-material/Save";
import { Saver } from "../Manager/tools";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { store } from "../App";
import { connect } from "react-redux";

export default connect((state) => ({ input: state.input }))(function Header({
  onRun,
  input,
}) {
  const [isOpen, setOpen] = React.useState(false);
  const [isFile, setFile] = React.useState(false);
  const [isInput, setInput] = React.useState(false);
  const EditInput = (e) => {
    store.dispatch({ type: "EDIT_INPUT", data: e.target.value });
  };
  const handleOen = () => {
    setOpen(!isOpen);
  };
  const handleInput = () => {
    setInput(!isInput);
  };

  const handleFile = () => {
    setFile(!isFile);
  };
  return (
    <>
      <Drawe
        open={isOpen}
        onClose={handleOen}
        direction="left"
        enableOverlay={true}
      >
        <h1>Options</h1>
      </Drawe>

      <Drawe
        open={isFile}
        onClose={handleFile}
        direction="right"
        enableOverlay={true}
      >
        <FExplorer></FExplorer>
      </Drawe>
      <Drawe
        open={isInput}
        onClose={handleInput}
        direction="bottom"
        enableOverlay={true}
      >
        <textarea
          className="EditInput"
          value={input}
          onChange={EditInput}
          placeholder="Enter Inputs"
        ></textarea>
      </Drawe>

      <div className="Header flex space-between">
        <div className="flex">
          <MenuOpenIcon onClick={handleOen}></MenuOpenIcon>
        </div>
        <div className="flex center">
          <SaveIcon onClick={Saver} className="Icons" />
          <FolderOpenIcon
            className="Icons"
            onClick={handleFile}
          ></FolderOpenIcon>
          <DriveFileRenameOutlineIcon
            onClick={handleInput}
          ></DriveFileRenameOutlineIcon>
          <PlayArrowIcon
            onClick={onRun}
            className="Icons PlayArrowIcon"
          ></PlayArrowIcon>
        </div>
      </div>
    </>
  );
});
