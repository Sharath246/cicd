import { Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type PillButtonProps = {
    onClick?: () => void;
    buttonText: string;
}

const PillButton = (props: PillButtonProps) => {
  return (
    <Box
      onClick={props.onClick}
      sx={{
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
    >
      <AddIcon sx={{ height: 28, width: 28 }} />
      <Typography fontWeight={500}>{props.buttonText}</Typography>
    </Box>
  );
};

export default PillButton;