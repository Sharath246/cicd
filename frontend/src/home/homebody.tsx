import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PillButton from "../commonComponents/pillButton.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store.ts";
import {
  addcollaborators,
  setcollaborators,
} from "../redux/collaborators.reducer.ts";
import AddIcon from "@mui/icons-material/Add";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export function HomeBody() {
  const [openWorkSpaceModal, setOpenWorkSpaceModal] = useState(false);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        padding: 3,
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {[1, 2, 3, 4, 5].map((item) => (
        <Card
          key={item}
          sx={{
            minWidth: 250,
            maxWidth: 300,
            flex: 1,
            backgroundColor: "#ffffff",
            borderRadius: 3,
            boxShadow: 3,
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.03)",
            },
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div" fontWeight={600}>
              be{bull}nev{bull}o{bull}lent
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="outlined">
              Learn More
            </Button>
          </CardActions>
        </Card>
      ))}

      <PillButton
        onClick={() => setOpenWorkSpaceModal(true)}
        buttonText={"Create Workspace"}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1976d2",
          color: "#fff",
          borderRadius: "50px",
          px: 3,
          py: 1,
          boxShadow: 5,
          cursor: "pointer",
          gap: 1,
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
        primaryIcon={<AddIcon sx={{ height: 28, width: 28 }} />}
      />

      <Dialog
        open={openWorkSpaceModal}
        onClose={() => setOpenWorkSpaceModal(false)}
        maxWidth="md"
        slotProps={{
          paper: {
            sx: {
              width: 800,
              height: 600,
              borderRadius: 4,
              p: 2,
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Create Workspace</DialogTitle>
        <DialogContent>
          <WorkspaceDialogContent />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenWorkSpaceModal(false);
            }}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              navigate("/workspace");
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

const WorkspaceDialogContent = () => {
  type ItemType = {
    id: string;
    name: string;
  };
  const timestamp = (() => {
    const d = new Date();
    return `WorkSpace ${d.getFullYear()}${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}${String(d.getDate()).padStart(2, "0")}_${String(d.getHours()).padStart(
      2,
      "0"
    )}${String(d.getMinutes()).padStart(2, "0")}${String(
      d.getSeconds()
    ).padStart(2, "0")}`;
  })();
  const [user, setUser] = useState("");
  const [workSpaceName, setWorkSpaceName] = useState(timestamp);
  const collaborators = useSelector(
    (state: RootState) => state.collaborator.collaborators
  );
  const dispatch = useDispatch();

  const handleChipDelete = (id: string) => {
    dispatch(setcollaborators(collaborators.filter((item) => item.id !== id)));
  };

  const handleAddChip = () => {
    if (user.trim() === "") return;
    dispatch(
      addcollaborators([{ id: `${user + collaborators.length}`, name: user }])
    );
    setUser("");
  };

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginTop: 3,
        }}
      >
        <Typography sx={{ flex: "1 0 5%" }} fontWeight={600}>
          WorkSpace Name
        </Typography>
        <TextField
          required
          fullWidth
          sx={{ flex: "1 0 50%" }}
          label="WorkSpace Name"
          value={workSpaceName}
          onChange={(e) => setWorkSpaceName(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginTop: 3,
        }}
      >
        <Typography sx={{ flex: "1 0 5%" }} fontWeight={600}>
          Add Collaborators
        </Typography>
        <TextField
          fullWidth
          sx={{ flex: "1 0 50%" }}
          label="Collaborator Name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddChip}
          sx={{ height: 40, minWidth: 40 }}
        >
          +
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          padding: collaborators.length !== 0 ? 1 : 0,
          borderRadius: 2,
          backgroundColor: "#f1f3f5",
        }}
      >
        {collaborators.map((item) => (
          <Chip
            key={item.id}
            label={item.name}
            onDelete={() => handleChipDelete(item.id)}
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        ))}
      </Box>
    </Box>
  );
};
