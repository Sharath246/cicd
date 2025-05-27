import { Box, styled } from "@mui/material";
import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript"; 
import "ace-builds/src-noconflict/theme-monokai";   

const EditorBox = styled(Box)({
  height: "80vh",
  width: "60vw",
  display: "flex",
  backgroundColor:"black",
  flexDirection: "column",
  boxSizing: "border-box",
  overflowY: "auto",
});

export default function SimpleEditor() {
  const [code, setCode] = React.useState("");

  return (
    <EditorBox>
      <AceEditor
        placeholder="code here"
        mode="javascript"
        theme="monokai"
        onChange={setCode}
        value={code}
        name="code_editor"
        editorProps={{ $blockScrolling: true }}
        width="100%"
        setOptions={{ showLineNumbers: true }}
      />
    </EditorBox>
  );
}
