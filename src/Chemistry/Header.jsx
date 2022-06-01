import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Skeleton from '@mui/material/Skeleton';
// import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
// import styled from '@emotion/styled';


const styled = StyleSheet.create({
  box:{
    width: "65px",
    backgroundColor: grey[900],
  },
  root:{

  }
})

export default function Header() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CodeOne
          </Typography>
  
            <IconButton      size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            >
            <FolderOpenIcon />
            </IconButton>

        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        // container={document.body}
        style={styled.box}
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}

        
        ModalProps={{
          keepMounted: true,
        }}
        ><Box style={styled.box}>
          
        </Box>
       
       
      </SwipeableDrawer>
    </Box>
  );
}