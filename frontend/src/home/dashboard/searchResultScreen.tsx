import { Box, Button, ButtonGroup, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";
import PillButton from "../../commonComponents/pillButton.tsx";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";

const ResultBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  marginTop: "1rem",
});

const SearchResultScreen = (props) => {
  const people = useSelector(
    (state: RootState) => state.searchResults.peopleResults
  );
  const workspaces = useSelector(
    (state: RootState) => state.searchResults.workspaceResults
  );

  const [seePeople, setSeePeople] = useState(true);

  return (
    <Box sx={{ width: "100%", paddingTop:2 }}>
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
      <Divider/>
      <ResultBox>
        {seePeople
          ? people.map((person) => (
              <PersonBox key={person.name} name={person.name} />
            ))
          : workspaces.map((ws) => (
              <WorkspaceBox key={ws.name} name={ws.name} />
            ))}
      </ResultBox>
    </Box>
  );
};

export default SearchResultScreen;

const PersonBox = (props) => {
  return <PillButton buttonText={props.name} />;
};

const WorkspaceBox = (props) => {
  return <PillButton buttonText={props.name} />;
};
