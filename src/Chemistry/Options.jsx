import React from "react";

import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Paper, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import { Settings } from "@mui/icons-material";
export default function Options() {
  return (
    <Paper style={{ height: "100%" }}>
      <MenuList>
        <Link to={"/settings"}>
          <MenuItem>
            <ListItemIcon>
              <Settings></Settings>
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
        </Link>

        <Link to={"/about"}>
          <MenuItem>
            <ListItemIcon>
              <InfoIcon></InfoIcon>
            </ListItemIcon>
            <ListItemText>About</ListItemText>
            <Typography variant="body2" color="text.secondary">
              v2.8.0
            </Typography>
          </MenuItem>
        </Link>
      </MenuList>
    </Paper>
  );
}
