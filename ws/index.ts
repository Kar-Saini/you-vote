import { WebSocketServer } from "ws";
import { VoteType, type INCOMING_MESSAGE } from "./utils/type";
import { VideoManager } from "./store/VideoManager";
const PORT = process.env.WS_PORT || 8080;
const wss = new WebSocketServer(
  {
    port: PORT as number,
  },
  () => console.log(`WS server started at ${PORT}`)
);

wss.on("connection", (ws) => {
  ws.onmessage = (event) => {
    const parsedData: INCOMING_MESSAGE = JSON.parse(event.data.toString());

    switch (parsedData.type) {
      case "get-polls": {
        const polls = VideoManager.getInstance().getAllPolls(
          parsedData.payload.videoId
        );
        ws.send(JSON.stringify({ type: "polls", payload: polls }));
        break;
      }
      case "create-poll": {
        VideoManager.getInstance().addPoll(
          parsedData.payload.videoId,
          parsedData.payload.pollContent
        );
        break;
      }
      case "vote": {
        const voteType =
          parsedData.payload.voteType === "downvote"
            ? VoteType.Downvote
            : VoteType.Upvote;
        VideoManager.getInstance().vote(
          parsedData.payload.videoId,
          parsedData.payload.pollId,
          parsedData.payload.userId,
          voteType
        );
        break;
      }
      case "get-poll-count": {
        const count = VideoManager.getInstance().getPollCounts(
          parsedData.payload.videoId,
          parsedData.payload.pollId
        );
        ws.send(JSON.stringify({ type: "poll-counts", payload: count }));
        break;
      }
    }
  };
});
