import axios from "axios";
import { RUN_SERVER } from "../config";
import { store } from "../App";
import { Socket } from "socket.io-client";
import { locationToString } from "./tools";
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

export function SMan(pac) {
  let id = localStorage.getItem("id");
  // console.log(pac);
  // let id =
  // console.log(pac);
  switch (pac.cmd) {
    case "ASK_FILES":
      let files = store.getState().files;
      let file = eval(locationToString(JSON.parse(pac.location)).str);
      store.dispatch({
        type: "MAKE_CONNECTION",
        data: {
          file: { id: file.id },
          from: pac.from,
        },
      });

      document.socket.emit(id, {
        to: pac.from,
        cmd: pac.subcmd === "SINGLE_FILE" ? "TAKE_FILE" : "TAKE_FILES",
        files: file,
        from: id,
      });

      break;

    // case "ASK_FILE":
    //   document.socket.emit(id, {
    //     to: pac.from,
    //     cmd: pac.subcmd === "SINGLE_FILE" ? "TAKE_FILE" : "TAKE_FILES",
    //     files: eval(locationToString(JSON.parse(pac.location)).str),
    //     from: id,
    //   });
    //   break;

    case "TAKE_FILES":
      store.dispatch({ type: "STORE_SHARE_FILE", data: pac });
      break;

    case "TAKE_FILE":
      // SET_FILE
      store.dispatch({ type: "SET_FILE", data: pac.files });

      break;

    case "EDIT_CONTENT":
      console.log("EDIT_CONTENT");
      store.dispatch({ type: "EDIT_FILE", data: pac.content });

      break;

    default:
      console.log(pac);
      break;
  }
}
