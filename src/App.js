import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Link,
} from "react-router-dom";
// import CodeIcon from "@mui/icons-material/Code";
// import BottomTab from "./Chemistry/BottomTab";
import Editor from "./Editor/Editor";
import "./Chemistry/_Chemistry.scss";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./Manager/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import ShareEditor from "./Editor/ShareEditor";
export const store = createStore(reducer, composeWithDevTools());
console.log(store.getState());
export default function App() {
  useEffect(() => {
    if (localStorage.getItem("state"))
      store.dispatch({
        type: "INIT",
        data: JSON.parse(localStorage.getItem("state")),
      });
  }, []);
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          {/* <Editor /> */}

          <Route exact path="/" element={<Editor />} />
          <Route
            path="/share/:id/:fileid/:location"
            element={<ShareEditor />}
          />
        </Routes>

        {/* <CodeIcon /> */}
      </div>
    </Provider>
  );
}
