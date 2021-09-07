const { Socket } = require("net");

const socket = new Socket();

socket.connect({ host: "localhost", port: 3000 });
socket.write("hola");
socket.setEncoding('utf-8');
socket.on("data", (data) => {
  console.log(data);
});
