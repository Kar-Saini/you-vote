import { WebSocketServer } from "ws";
const PORT = process.env.WS_PORT || 8080;
const wss = new WebSocketServer(
  {
    port: PORT as number,
  },
  () => console.log(`WS server started at ${PORT}`)
);

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ message: "Hello" }));
});
