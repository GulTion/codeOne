import React,{useState} from 'react'
import { Tabs,Tab } from '@mui/material'
// import { Box } from '@mui/system';
import { Box } from '@mui/material';
export default function FileTab() {
    const [value, setValue]=useState(0);
    const handleChange = (e,nv)=>{
        console.log(e);
        setValue(nv)
    }
  return (
      <Box sx={{bgcolor: 'background.paper', maxWidth: { xs: 320, sm: 480 }}}>

    <Tabs
  value={value}
  onChange={handleChange}
  variant="scrollable"
  scrollButtons="auto"
  aria-label="scrollable auto tabs example"
>
  <Tab label="Item One" />
  <Tab label="Item Two" />
  <Tab label="Item Three" />
  <Tab label="Item Four" />
  <Tab label="Item Five" />
  <Tab label="Item Six" />
  <Tab label="Item Seven" />
</Tabs>
</Box>

  )
}
