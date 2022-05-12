import React from 'react'
import Fab from '@mui/material/Fab';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowBack from '@mui/icons-material/ArrowBack';


export default function RunButton({onClick,toggle}) {
  return (
    <Fab color="primary" aria-label="add" style={{
        position: 'absolute',
        bottom: 16,
        right: 16,
      }}>
    {toggle?<ArrowBack onClick={onClick} />:<PlayArrowIcon onClick={onClick} />}
    
  </Fab>
  )
}
