import {
  AppBar,
  IconButton,
  Toolbar,
  InputBase,
  Avatar,
  Box,
  Popper,
  Button,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  handleAutoComplete,
  handleWebsocketMessage,
} from "../../utils/helperFunctions.ts";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store.ts";
import { useContext, useEffect, useRef, useState } from "react";
import SearchResultScreen from "./searchResultScreen.tsx";
import { searchStore } from "./searchStore.ts";
import {
  setFilteredPeople,
  setPeopleResults,
} from "../../redux/searchResults.redux.ts";
import { SearchResultContext } from "../../context/searchResultContext.ts";
import { setUserData } from "../../redux/user.reducer.ts";
import { STATUS_SUCCESS } from "../../utils/constants.ts";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  maxWidth: "50ch",
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
  const dispatch = useDispatch();
  const [screenId, setScreenId] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pageLoadingMessage, setPageLoadingMessage] = useState("Loading...");
  const status: string = useSelector(
    (state: RootState) => state.user.userFetchStatus
  );
  // const socketRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    // const socket = new WebSocket("ws://localhost:9000/people");
    // socketRef.current = socket;
    // socket.onopen = () => {
    // };
    // socket.onmessage = (event) => {
    //   const peopleArray = JSON.parse(event.data);
    //   dispatch(setPeopleResults(peopleArray));
    // };
    async function fetchUserData() {
      try {
        const response = await axios.get(
          "http://localhost:8080/getUserDetails",
          {
            headers: {
              email: sessionStorage.getItem("user"),
            },
          }
        );
        dispatch(setUserData(response.data));
        const peopleResponse = await axios.get(
          "http://localhost:8080/getAllPeople"
        );
        dispatch(setPeopleResults(peopleResponse.data));
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    }
    if (status !== STATUS_SUCCESS) fetchUserData();
    setLoading(false);
  }, []);
  return (
    // <SearchResultContext.Provider value={socketRef.current}>
    loading ? (
      <>{pageLoadingMessage}</>
    ) : (
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
            <SearchBox
              setScreenId={setScreenId}
              // connection={socketRef.current}
            />
            <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <UserAvatar />
            </Box>
          </Toolbar>
        </AppBar>

        {screenId === 1 ? (
          <Outlet />
        ) : (
          <SearchResultScreen setScreenId={setScreenId} />
        )}
      </>
    )
    // </SearchResultContext.Provider>
  );
};

const UserAvatar = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const id = "basic-popper";
  return (
    <Box
      aria-describedby={id}
      onClick={(e) => {
        setOpen(true);
        setAnchorEl(e.currentTarget as HTMLDivElement);
      }}
    >
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Button
          sx={{ border: 1, p: 1, bgcolor: "background.paper" }}
          onClick={() => {
            navigate("/");
          }}
        >
          logout
        </Button>
      </Popper>
      <Avatar sx={{ ml: 2 }}>{props.user?.name[0] || "U"}</Avatar>
    </Box>
  );
};

const SearchBox = (props) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const people = useSelector((state: RootState) => {
    return state.searchResults.peopleResults;
  });
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
          onClick={() => props.setScreenId(2)}
          onChange={(e) => {
            setSearchValue(e.target.value);
            if (e.target.value.length >= 2)
              dispatch(
                setFilteredPeople(
                  people.filter(
                    (item: string) =>
                      item.slice(0, e.target.value.length) === e.target.value
                  )
                )
              );
            else dispatch(setFilteredPeople([]));
            //   props.connection.send(e.target.value);
          }}
          value={searchValue}
          endAdornment={
            <Button
              onClick={(e) => {
                e.stopPropagation();
                props.setScreenId(1);
              }}
            >
              <CloseIcon />
            </Button>
          }
        />
      </Search>
    </Box>
  );
};
