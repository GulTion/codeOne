import { AccountBalanceSharp } from "@mui/icons-material";
import produce from "immer";
import { createStore } from "redux";

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
};

const handleProduce = (state = store, action) => {
  const { type, data } = action;
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
          eval(action.data.location);
          state.file.content = action.data.content;
          localStorage.setItem("state", JSON.stringify(state));
        }
      }

      break;
    case "SET_FILE":
      state.file = action.data;
      document.setEv(action.data);

      break;

    case "EDIT_FILE":
      state.file.content = action.data;

      break;

    case "ADD_FILE":
      console.log(data);
      if (1) {
        let strSize = data.strLocation + ".size += 1";
        let strLocation = data.strLocation + ".files.push(data)";

        let files = state.files;
        eval(strLocation);
        eval(strSize);
        state.file = action.data;
        document.setEv(action.data);
      }
      break;

    case "DELETE_ANY":
      console.log(data);
      if (1) {
        let str = data.pstrLocation;
        let id = data.id;
        // let files = state.files;

        str = `state.${str}.files=state.${str}.files.filter(e=>e.id!=="${id}")`;
        // console.log(str);
        eval(str);
        // state.file = action.data;
        // document.setEv(action.data);
      }

      break;

    case "EDIT_INPUT":
      state.input = data;
      break;
    default:
      return state;
  }
};
export const reducer = produce(handleProduce);
