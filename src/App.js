import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Link,
} from "react-router-dom";
import CodeIcon from "@mui/icons-material/Code";
import BottomTab from "./Chemistry/BottomTab";
import Editor from "./Editor/Editor";
import "./Chemistry/_Chemistry.scss";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./Manager/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
export const store = createStore(reducer, composeWithDevTools());
console.log(store.getState());
export default function App() {
  useEffect(() => {
    store.dispatch({
      type: "INIT",
      data: JSON.parse(localStorage.getItem("state")),
    });
  }, []);
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="settings/" element={<h1>Settings</h1>} />
          <Route path="run/" element={<h1>Settings</h1>} />
          <Route exact path="/" element={<Editor />} />
        </Routes>

        {/* <CodeIcon /> */}
      </div>
    </Provider>
  );
}
