import { io } from "socket.io-client";

const socket = io("http://localhost:8080", {
  withCredentials: true,
  autoConnect: false, // we'll connect manually after login
});

export default socket;
