import { Paper, Stack } from "@mui/material";
import React from "react";
import CustomHeader from "./CustomHeader";

export default function About() {
  return (
    <div>
      <Stack spacing={3}>
        <CustomHeader title="About"></CustomHeader>
        <Paper style={{ margin: "0 10", padding: "10" }}>
          <h2>CodeInOne</h2>
          <h3>Developed By:</h3>
          {/* <br></br> */}
          <p>Gulshan</p>
          {/* <br></br>/ */}
          {/* <br></br> */}
          <p>Jai Bhardwaj</p>
          {/* <br></br> */}
          <p>Jai Chauhan</p>
        </Paper>
      </Stack>
    </div>
  );
}
