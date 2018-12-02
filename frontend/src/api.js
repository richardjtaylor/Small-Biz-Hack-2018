// api/index.js
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5000/");

export const receive_message = cb => {
  socket.on("receive_message", response => {
    console.log(response);
    cb(response);
  });
};

export const send_message = message => {
  socket.emit("send_message", { message }, response => {
    console.log(response);
  });
};
