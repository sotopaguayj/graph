import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();


  const hanldeBasic = () => {
    navigate("/");
  };
  const hanlde3dname = () => {
    navigate("/3dlabel");
  };
  const hanlde3dimage = () => {
    navigate("/3dimage");
  };
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokemon!
          </Typography>

          <Switch
            color="default"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <Button onClick={hanldeBasic} color="inherit" sx={{ marginLeft: 1 }}>
            BASIC-NAME
          </Button>
          <Button onClick={hanlde3dname} color="inherit" sx={{ marginLeft: 1 }}>
            3D-NAME
          </Button>
          <Button
            onClick={hanlde3dimage}
            color="inherit"
            sx={{ marginLeft: 1 }}
          >
            IMAGE-NODE
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
