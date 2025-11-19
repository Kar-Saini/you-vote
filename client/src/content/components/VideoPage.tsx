import { useEffect, useState } from "react";
import type { INCOMING_MESSAGE } from "../../utils/type";

const VideoPage = ({ videoId }: { videoId: string }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      setSocket(ws);
      socket?.send(JSON.stringify({ type: "get-polls", payload: { videoId } }));
    };

    ws.onmessage = (event) => {
      const parsedEvent:INCOMING_MESSAGE = JSON.parse(event.data);
      
      switch(parsedEvent.type){
        case "polls":
          
      }

      console.log("Message from server:", event.data);
    };
    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    return () => {
      ws.close();
    };
  }, [videoId]);

  return (
    <div>
      <div className="border p-3 rounded-lg shadow-sm bg-gray-50">
        <p className="font-semibold">Video ID:</p>
        <p className="text-sm break-all text-gray-500">{videoId}</p>
      </div>

      <div className="border p-3 rounded-lg shadow-sm hover:bg-gray-50">
        <p className="font-semibold">Make a video about sleep schedule</p>

        <div className="flex items-center gap-4 mt-2">
          <button className="px-3 py-1 rounded-lg bg-green-500 text-white">
            👍 120
          </button>
          <button className="px-3 py-1 rounded-lg bg-red-500 text-white">
            👎 12
          </button>
        </div>
      </div>

      <div className="text-gray-500 text-center text-sm">
        More polls coming soon…
      </div>
    </div>
  );
};

export default VideoPage;
