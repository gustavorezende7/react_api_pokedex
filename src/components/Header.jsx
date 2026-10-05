import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="sticky" color="primary" elevation={2}>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ color: "inherit", textDecoration: "none", fontWeight: 700 }}>
          Pokédex React
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
