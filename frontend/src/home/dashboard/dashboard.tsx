import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import { Outlet } from "react-router-dom"
import Menu from "@mui/icons-material/Menu"

export const Dashboard = () =>{
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <Menu/> 
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              CICD APP
            </Typography>
          </Toolbar>
        </AppBar>
        <Outlet />
      </>
    );
}