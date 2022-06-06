import produce from "immer";
import { createStore } from "redux";

const store = {
  input: "",
  file: {},
  files: {
    type: "folder",
    name: "/",
    files: [
      {
        id: "9ba95c30a3",
        type: "file",
        name: "main.py",
        location: [0],
        address: ["main.py"],
      },
      {
        type: "folder",
        name: "Chemistry",
        files: [
          {
            id: "7a05f8cff8",
            type: "file",
            name: "main.py",
            address: ["Chemistry", "main.py"],
            location: [1, 0],
          },
          {
            id: "ce1e9433e2",
            type: "file",
            name: "app.py",
            content: "3",
            address: ["Chemistry", "app.py"],
            location: [1, 1],
          },
          {
            type: "folder",
            name: "abc",
            files: [
              {
                id: "b2d753ed2e",
                type: "file",
                name: "main.py",
                address: ["Chemistry", "abc", "main.py"],
                location: [1, 2, 0],
              },
              {
                type: "folder",
                name: "Chemistry",
                files: [
                  {
                    id: "9278e75d24",
                    type: "file",
                    name: "main.py",
                    content: "5",
                    address: ["Chemistry", "abc", "Chemistry", "main.py"],
                    location: [1, 2, 1, 0],
                  },
                  {
                    id: "792f469858",
                    type: "file",
                    name: "app.py",
                    content: "6",
                    address: ["Chemistry", "abc", "Chemistry", "app.py"],
                    location: [1, 2, 1, 1],
                  },
                ],
                address: ["Chemistry", "abc", "Chemistry"],
                location: [1, 2, 1],
                id: "f0f3ff1849",
              },
            ],
            address: ["Chemistry", "abc"],
            location: [1, 2],
            id: "0ddb4b73a2",
          },
        ],
        address: ["Chemistry"],
        location: [1],
        id: "82d8afe2ca",
      },
    ],
    address: [],
    location: [],
    id: "24347ef141",
  },
};

const handleProduce = (state = store, action) => {
  const { type, data } = action;
  switch (type) {
    case "INIT":
      state.file = action.data.file;
      state.input = action.data.input;
      state.files = action.data.files;
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

    case "EDIT_INPUT":
      state.input = data;
      break;
    default:
      return state;
  }
};
export const reducer = produce(handleProduce);
