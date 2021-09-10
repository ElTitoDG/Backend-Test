const { Socket } = require("net");
const readline = require("readline");
const colors = require("colors");

colors.setTheme({
  username: ['blue', 'underline'],
  END: ['red', 'bold'],
  error: ['underline', 'bold', 'bgRed'],
  connect: ['bold', 'green']
})

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const END = "END";

const error = (message) => {
  console.error(message);
  process.exit(1);
};

const connect = (host, port) => {
  console.log(`Connecting to ${host}:${port}`.connect);

  const socket = new Socket();
  socket.connect({ host, port });
  socket.setEncoding("utf-8");

  socket.on("connect", () => {
    console.log("Connected".green);

    input.question("Choose your usename: ", (username) => {
      socket.write(username.bold);
      console.log(`Type any message to send it, type ${END} to finish chat`.username);
    });

    input.on("line", (message) => {
      socket.write(message);
      if (message === END) {
        socket.end();
        console.log("Disconnected".END);
      }
    });

    socket.on("data", (data) => {
      console.log(data.yellow);
    });
  });

  socket.on("error", (err) => error(err.message));
  socket.on("close", () => process.exit(0));
};

const main = () => {
  if (process.argv.length !== 4) {
    error(`Usage: node ${__filename} host port`.error);
  }

  let [, , host, port] = process.argv;
  if (isNaN(port)) {
    error(`Invalid port: ${port}`.error);
  }
  port = Number(port);

  connect(host, port);
};

if (module === require.main) {
  main();
}


