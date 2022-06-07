import axios from "axios";
import { RUN_SERVER } from "../config";
import { store } from "../App";
export function runRequest({ file }) {
  return axios.post(
    RUN_SERVER,
    {
      properties: {
        language: file.language,
        files: [file],
        stdin: store.getState().input,
      },
    },
    { headers: { "content-type": "application/json" } }
  );
}
