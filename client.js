const { Socket } = require("net");
const readline = require("readline");

const chat = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const socket = new Socket();

socket.connect({ host: "localhost", port: 3000 });
socket.setEncoding("utf-8");

chat.on("line", (line) => {
  socket.write(line);
});

socket.on("data", (data) => {
  console.log(data);
});
