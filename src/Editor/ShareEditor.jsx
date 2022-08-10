import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// import { useParams,  } from "react-router";
import { io } from "socket.io-client";
import { SERVER } from "../config";
import { SMan } from "../Manager/Request";
import { nanoid } from "../Manager/tools";
import Editor from "./Editor";

if (!localStorage.getItem("id")) {
  localStorage.setItem("id", nanoid());
}

const socket = io(SERVER);

socket.on("connect", () => {
  console.log("connected");
  socket.on(localStorage.getItem("id"), (data) => {
    // console.log(data);
    SMan(data);
  });
  socket.emit("makeio", { id: localStorage.getItem("id") });
  document.socket = socket;
});

export default function ShareEditor() {
  const a = useParams();
  const [sw, setSw] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    let id = localStorage.getItem("id");

    if (a.id === id) navigate("/");
    else {
      setTimeout(() => {}, []);
    }
  }, []);

  const handleAsk = () => {
    let id = localStorage.getItem("id");

    // socket.emit(id, { to: a.id, from: id, cmd: "ASK_FILES", ...a });
    socket.emit(id, {
      to: a.id,
      from: id,
      cmd: "ASK_FILES",
      ...a,
      subcmd: "SINGLE_FILE",
    });

    setSw((s) => !s);
  };
  return sw ? <button onClick={handleAsk}>CONN</button> : <Editor mode={sw} />;
}
