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
import { QrCodeScanner, Scanner, ShareRounded } from "@mui/icons-material";
import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { Select, MenuItem } from "@mui/material";
import QRCode from "react-qr-code";
// import  from "@mui/material";
export default connect((state) => ({ input: state.input }))(function Header({
  onRun,
  input,
  mode,
}) {
  const [isOpen, setOpen] = React.useState(false);
  const [isFile, setFile] = React.useState(false);
  const [isInput, setInput] = React.useState(false);
  const [isShare, setShare] = React.useState(false);
  const [qrOpen, setqrOpen] = React.useState(false);
  const [qrtext, setqrtext] = React.useState("");
  const handleQr = () => {
    setqrOpen(!qrOpen);
    // setFile(false);
  };
  // const [cList, setcList] = React.useState([]);
  const [nowC, setC] = React.useState("NOT FOUND");
  const EditInput = (e) => {
    store.dispatch({ type: "EDIT_INPUT", data: e.target.value });
  };
  const handleOen = () => {
    setOpen(!isOpen);
  };
  const handleShare = () => {
    // handleSelectCamera();
    setShare(!isShare);
  };

  const handleInput = () => {
    setInput(!isInput);
  };
  const handleFile = () => {
    setFile(!isFile);
  };

  const handleSelectCamera = (e) => {
    // setC(e.target.value);

    function onScanSuccess(decodedText, decodedResult) {
      // handle the scanned code as you like, for example:
      console.log(`Code matched = ${decodedText}`, decodedResult);
      setC(window.location.origin + decodedText);
      // html5QrcodeScanner.pause();
      // html5QrcodeScanner.
      Html5Qrcode.stop();
    }

    function onScanFailure(error) {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
      console.warn(`Code scan error = ${error}`);
    }

    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
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
        style={{
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClose={handleQr}
        open={qrOpen}
        direction="bottom"
      >
        <QRCode width={"100%"} value={qrtext}></QRCode>
      </Drawe>
      <Drawe
        open={isFile}
        onClose={handleFile}
        direction="right"
        enableOverlay={true}
      >
        <FExplorer
          mode={mode}
          Draw={{
            onClose: handleQr,
            open: qrOpen,
            qrtext,
            setqrOpen: (k) => {
              setqrOpen(k);
              setFile(false);
            },
            setqrtext,
          }}
        ></FExplorer>
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

      <Drawe
        open={isShare}
        onClose={handleShare}
        direction="bottom"
        enableOverlay={true}
        style={{ height: "400px" }}
      >
        <div id="reader" width="600px"></div>
        <a href={nowC}>{nowC}</a>
      </Drawe>

      <div className="Header flex space-between">
        <div className="flex">
          <MenuOpenIcon onClick={handleOen}></MenuOpenIcon>
        </div>
        <div className="flex center">
          {mode && (
            <QrCodeScanner onClick={handleShare}>
              <div id="render"></div>
            </QrCodeScanner>
          )}

          {mode && <SaveIcon onClick={Saver} className="Icons" />}

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
