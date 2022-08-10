import React, { useState } from "react";
import CustomHeader from "./CustomHeader";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

/**
 *
 * FontSize
 * Theme
 *
 */

let theme = [
  "solarized_dark",
  "ambiance",
  "chaos",
  "chrome",
  "clouds",
  "clouds_midnight",
  "cobalt",
  "crimson_editor",
  "dawn",
  "dracula",
  "dreamweaver",
  "eclipse",
  "github",
  "gob",
  "gruvbox",
  "idle_fingers",
  "iplastic",
  "katzenmilch",
  "kr_theme",
  "kuroir",
  "merbivore",
  "merbivore_soft",
  "monokai",
  "mono_industrial",
  "nord_dark",
  "one_dark",
  "pastel_on_dark",
  "solarized_light",
  "sqlserver",
  "terminal",
  "textmate",
  "tomorrow",
  "tomorrow_night",
  "tomorrow_night_blue",
  "tomorrow_night_bright",
  "tomorrow_night_eighties",
  "twilight",
  "vibrant_ink",
  "xcode",
];
export default function Settings() {
  const [set, setSet] = useState(
    JSON.parse(localStorage.getItem("settings") || `{}`)
  );

  const handleChange = (type) => {
    return (event) => {
      setSet((e) => {
        let k = { ...e, [type]: event.target.value };
        localStorage.setItem("settings", JSON.stringify(k));
        return k;
      });
    };
  };
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <CustomHeader></CustomHeader>

        <Stack spacing={3}>
          <FormControl sx={{ m: 3 }} style={{ margin: "20" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Font Size
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={set.fontSize}
              onChange={handleChange("fontSize")}
              label="Font Size"
            >
              {[10, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32].map((e) => (
                <MenuItem value={e}>{e}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl style={{ margin: "20" }}>
            <InputLabel id="demo-simple-thmee-standard-label">
              Editor Theme
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={set.theme}
              onChange={handleChange("theme")}
              label="Editor Theme"
            >
              {theme.map((e) => (
                <MenuItem value={e}>
                  {e.split("_").join(" ").toLocaleUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Box>
    </div>
  );
}
