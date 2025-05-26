import { Box, styled, TextField } from "@mui/material";

const EditorBoard = styled(Box)({
  backgroundColor: "black",
  height: "80vh",
  width: "60vw",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  overflowY:"auto"
});

const Editor = () => {
  return (
    <EditorBoard>
      <TextField
        multiline
        placeholder="code here..."
        fullWidth
        sx={{
          flex: 1,
          height: "100%",
          "& .MuiOutlinedInput-root": {
            height: "100%",
            alignItems: "flex-start",
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },
          "& .MuiInputBase-input": {
            height: "100%",
            resize: "none",
            overflowY: "auto",
            overflowX: "hidden",
            color: "white",
            boxSizing: "border-box",
          },
        }}
      />
    </EditorBoard>
  );
};

export default Editor;
