import { Box, SwipeableDrawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
// import RunButton from '../Chemistry/RunButton';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-javascript";

import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-clouds";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-crimson_editor";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-gob";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/theme-iplastic";
import "ace-builds/src-noconflict/theme-katzenmilch";
import "ace-builds/src-noconflict/theme-kr_theme";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-merbivore";
import "ace-builds/src-noconflict/theme-merbivore_soft";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-mono_industrial";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-sqlserver";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/theme-xcode";

import "ace-builds/src-noconflict/ext-language_tools";

import Output from "./Output";
import { runRequest } from "../Manager/Request";
import ShortSym from "./ShortSym";
import Header from "../Chemistry/Header";

import { connect } from "react-redux";
import { store } from "../App";
import { useParams } from "react-router";
// import { useHistory } from "react-router-dom";
// import { DoNotTouch } from "@mui/icons-material";
// import { useHis } from "react-router-dom";

let id = localStorage.getItem("id");

const langToEditorMap = {
  cpp: "c_cpp",
  c: "c_cpp",
};

export default connect((state) => ({ file: state.file }))(function Editor({
  file,
  mode = true,
}) {
  const param = useParams();
  let set = JSON.parse(
    localStorage.getItem("settings") || `{"theme":"solarized_dark"}`
  );

  // const hist = useHistory();

  const [out, setOut] = useState(false);
  const [ev, setEv] = useState(file);
  const [output, setOutput] = useState({});
  useEffect(() => {
    setEv(file);
  }, [file]);
  useEffect(() => {
    document.setEv = setEv;
    // document.hist = hist;
    //
  }, []);

  const handleOutput = () => {
    if (!out) {
      // console.log("CODE");
      setOutput({ loading: true });
      runRequest({ file })
        .then((data) => {
          console.log(data.data);
          setOutput(data.data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
    setOut((k) => !k);
  };

  const handleChange = (e) => {
    console.log("EDIT_CONTENT share");
    if (!mode) {
      document.socket.emit(id, {
        to: param.id,
        cmd: "EDIT_CONTENT",
        // ...file,

        location: file.location,
        fileid: file.id,
        content: e,
      });

      // console.log(file);
      // console.log(param);
    }
    let connection = store.getState().connection[file.id];
    document.socket.emit(id, {
      to: connection,
      cmd: "EDIT_CONTENT",
      // ...file,

      location: file.location,
      fileid: file.id,
      content: e,
    });
    store.dispatch({ type: "EDIT_FILE", data: e });
  };

  document.handleChange = handleChange;
  return (
    <div className="Editor" width={"100%"}>
      {/* <Header></Header> */}
      <Header onRun={handleOutput} mode={mode}></Header>
      {/* <Drawer></Drawer> */}

      <AceEditor
        width="100%"
        fontSize={set.fontSize}
        height="90vh"
        disabled={true}
        wrapEnabled={true}
        mode={langToEditorMap[file.language] || file.language}
        theme={set.theme}
        placeholder="Code Here"
        value={file.content}
        key={file.id}
        name={file.id}
        onChange={handleChange}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          // tabSize: 2,
        }}
      />

      {out && <Output output={output} setOut={handleOutput}></Output>}
    </div>
  );
});
