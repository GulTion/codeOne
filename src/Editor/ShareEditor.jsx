import React from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");
socket.on("connect", () => {
  console.log("connected");
});
export default function ShareEditor() {
  const a = useParams();
  return <div>{JSON.stringify(a)}</div>;
}
