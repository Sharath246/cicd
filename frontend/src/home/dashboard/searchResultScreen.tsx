import { Avatar, Box, Button, ButtonGroup, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";
import PillButton from "../../commonComponents/pillButton.tsx";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";

const ResultBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  marginTop: "1rem",
});

const SearchResultScreen = (props) => {
  const people = useSelector((state: RootState) => {
    return state.searchResults.filteredPeople;
  });
  const workspaces = useSelector(
    (state: RootState) => state.searchResults.filteredWorkspaces
  );

  const [seePeople, setSeePeople] = useState(true);

  return (
    <Box sx={{ width: "100%", paddingTop: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          mb: 2,
        }}
      >
        <Box sx={{ flex: 1 }} />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant={seePeople ? "contained" : "outlined"}
            onClick={() => setSeePeople(true)}
          >
            People
          </Button>
          <Button
            variant={!seePeople ? "contained" : "outlined"}
            onClick={() => setSeePeople(false)}
          >
            Workspace
          </Button>
        </Box>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => props.setScreenId(1)}>
            <CloseIcon />
          </Button>
        </Box>
      </Box>
      <Divider />
      <ResultBox>
        {seePeople ? (
          people.length > 0 ? (
            people.map((person) => <PersonBox key={person} name={person} />)
          ) : (
            <>No Results</>
          )
        ) : workspaces.length > 0 ? (
          workspaces.map((ws) => <WorkspaceBox key={ws} name={ws} />)
        ) : (
          <>No Results</>
        )}
      </ResultBox>
    </Box>
  );
};

export default SearchResultScreen;

const PersonBox = (props) => {
  return (
    <PillButton
      buttonText={props.name}
      style={{
        display: "flex",
        width: "30%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1976d2",
        color: "#fff",
        borderRadius: "50px",
        px: 1,
        py: 1,
        boxShadow: 5,
        cursor: "pointer",
        marginBottom: 2,
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: "#1565c0",
        },
      }}
      primaryIcon={<Avatar>{props.user?.name[0] || "U"}</Avatar>}
      secondaryIcon={<AddIcon sx={{ height: 28, width: 28 }} />}
    />
  );
};

const WorkspaceBox = (props) => {
  return <Box>{props.name}</Box>;
};
