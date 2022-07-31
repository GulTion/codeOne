import { AccountBalanceSharp } from "@mui/icons-material";
import produce from "immer";
import { useParams } from "react-router";
import { createStore } from "redux";
import { ad_loBuilder, locationToString } from "./tools";

const store = {
  input: "",
  file: {},
  files: {
    type: "folder",
    name: "/",
    files: [],
    address: [],
    location: [],
    id: "24347ef141",
    size: 0,
  },
  share: {},
};

const handleProduce = (state = store, action) => {
  const { type, data } = action;
  // let param = useParams()

  switch (type) {
    case "INIT":
      if (data) {
        try {
          state.file = action.data.file;
          state.input = action.data.input;
          state.files = action.data.files;
        } catch (e) {
          console.log(e);
        }
      }

      break;
    case "SAVE_FILE":
      if (1) {
        if (state.file.id) {
          //   console.log(action.data);
          let files = state.files;
          // if (!data.mode) {
          //   files = state.share[data.id];
          // }
          eval(action.data.location);
          state.file.content = action.data.content;
          localStorage.setItem("state", JSON.stringify(state));
        }
      }

      break;
    case "SET_FILE":
      state.file = action.data;
      // if(data.mode)
      document.setEv(action.data);

      break;

    case "EDIT_FILE":
      state.file.content = action.data;

      break;

    case "ADD_FILE":
      console.log(data);
      if (1) {
        let files = state.files;
        let pointer = files;
        data.location.map((e, i) => {
          if (data.location.length - 1 > i) {
            pointer = pointer.files[e];
          }
        });

        console.log(JSON.stringify(pointer, null, 2));
        pointer.files.push(data);
        pointer.size++;

        state.file = action.data;
        document.setEv(action.data);
      }
      break;

    case "DELETE_ANY":
      console.log(data);
      if (1) {
        let str = data.strLocation;
        // let id = data.id;
        // let files = state.files;

        str = `state.${str}.permission = 0`;
        // console.log(str);
        eval(str);
        // state.file = action.data;
        // document.setEv(action.data);
      }

      break;

    case "STORE_SHARE_FILE":
      state.share[data.from] = data.files;
      break;

    case "EDIT_INPUT":
      state.input = data;
      break;

    case "EDIT_FILE_DEEP":
      if (1) {
        let files = state.files;
        if (data.share) {
          files = state.share;
        }
        let str =
          locationToString(data.location).str + `.content = data.content`;
        if (state.file.id === data.fileid) {
          state.file.content = data.content;
        }

        eval(str);
        // console.log(data);
      }
      break;
    default:
      return state;
  }
};
export const reducer = produce(handleProduce);
