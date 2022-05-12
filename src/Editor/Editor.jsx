import { Box, SwipeableDrawer } from '@mui/material';
import React, {useState} from 'react'
import AceEditor from "react-ace";
import RunButton from '../Chemistry/RunButton';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-solarized_dark"
import "ace-builds/src-noconflict/ext-language_tools";
import Output from './Output';

export default function Editor() {
  const [out, setOut] = useState(false)
  const [ev, setEv] = useState("")
  const handleOutput = ()=>{
setOut(k=>!k)
  }
  const handleChange = (e)=>{
    // console.log(e);
    setEv(e)
  }
  return (
    <Box className='Editor' width={"100%"}>
      <AceEditor width='100%' fontSize={17} height="90vh" wrapEnabled={true}
          mode="python"
          theme="solarized_dark"
    placeholder='Code Here'
      value={ev}
          name="UNIQUE_ID_OF_DIV"
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
      <SwipeableDrawer  />;
      
      <RunButton toggle={out} onClick={handleOutput}></RunButton>
{out&&<Output ></Output>}
    </Box>
  )
}
