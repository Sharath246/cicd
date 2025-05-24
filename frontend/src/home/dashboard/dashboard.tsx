import {
  AppBar,
  IconButton,
  Toolbar,
  InputBase,
  Avatar,
  Box,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { handleAutoComplete } from "../../utils/helperFunctions.ts";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { RootState } from "../../store.ts";
import { useState } from "react";
import SearchResultScreen from "./searchResultScreen.tsx";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  maxWidth: "40ch",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

export const Dashboard = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [screenId, setScreenId] = useState(1);
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", alignItems: "center", px: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ gap: "5px" }}
            >
              <Menu />
              CICD
            </IconButton>
          </Box>
          <SearchBox setScreenId = {setScreenId}/>
          <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Avatar sx={{ ml: 2 }}>{user?.name[0] || "U"}</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      {
        screenId===1?  <Outlet />
        : 
        <SearchResultScreen setScreenId = {setScreenId}/>
      }
    </>
  );
};

const SearchBox = (props) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search for People or Workspaces"
          inputProps={{ "aria-label": "search" }}
          onKeyDown={(e) => handleAutoComplete(e)}
          onClick={() => props.setScreenId(true)}
        />
      </Search>
    </Box>
  );
};
