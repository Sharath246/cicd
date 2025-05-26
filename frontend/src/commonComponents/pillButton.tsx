import { Box, Typography } from "@mui/material";

type PillButtonProps = {
  onClick?: () => void;
  buttonText: string;
  style?: any;
  primaryIcon?: React.ReactNode;
  secondaryIcon?: React.ReactNode;
};

const PillButton = (props: PillButtonProps) => {
  return (
    <Box onClick={props.onClick} sx={props.style}>
      {props.primaryIcon}
      <Typography fontWeight={500}>{props.buttonText}</Typography>
      {props.secondaryIcon}
    </Box>
  );
};

export default PillButton;
