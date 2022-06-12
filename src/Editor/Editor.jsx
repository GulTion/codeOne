import { Box, SwipeableDrawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
// import RunButton from '../Chemistry/RunButton';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-javascript";

import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import Output from "./Output";
import { runRequest } from "../Manager/Request";
import ShortSym from "./ShortSym";
import Header from "../Chemistry/Header";

import { connect } from "react-redux";
import { store } from "../App";

const langToEditorMap = {
  cpp: "c_cpp",
  c: "c_cpp",
};
export default connect((state) => ({ file: state.file }))(function Editor({
  file,
}) {
  const [out, setOut] = useState(false);
  const [ev, setEv] = useState(file);
  const [output, setOutput] = useState({});
  useEffect(() => {
    setEv(file);
  }, [file]);
  useEffect(() => {
    document.setEv = setEv;
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
    // console.log(e);
    // setEv((k) => ({ ...k, content: e }));
    store.dispatch({ type: "EDIT_FILE", data: e });
  };
  document.handleChange = handleChange;
  return (
    <div className="Editor" width={"100%"}>
      {/* <Header></Header> */}
      <Header onRun={handleOutput}></Header>
      {/* <Drawer></Drawer> */}

      {/* <CodeMirror
        value={ev.content}
        options={{
          mode: "javascript",
          theme: "material",
          lineNumbers: true,
        }}
        onChange={(editor, data, value) => {}}
      /> */}
      <AceEditor
        width="100%"
        fontSize={17}
        height="90vh"
        disabled={true}
        wrapEnabled={true}
        mode={langToEditorMap[file.language] || file.language}
        theme="solarized_dark"
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
