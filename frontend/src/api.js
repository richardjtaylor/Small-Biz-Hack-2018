// api/index.js
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5000/");

export const receive_message = cb => {
  socket.on("receive_message", response => {
    cb(response);
  });
};

export const send_message = (type, text_body) => {
  socket.emit(
    "send_message",
    { chat_id: "f4c9e67c-fa38-4114-b2dc-4a04f3a70193", type, text_body },
    response => {}
  );
};

export const receive_images = cb => {
  socket.on("receive_images", response => {
    cb(response);
  });
};
