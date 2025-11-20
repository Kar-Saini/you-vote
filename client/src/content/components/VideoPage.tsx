import { useEffect, useRef, useState,  } from "react";
import type { INCOMING_MESSAGE } from "../../utils/type";

const VideoPage = ({ videoId }: { videoId: string }) => {
   const socketRef = useRef<WebSocket | null>(null);
  const[message, setMessage] = useState("")

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    socketRef.current = ws;

    ws.onopen = () => {console.log("WS connected")
      ws.send(
      JSON.stringify({
        type: "get-polls",
        payload: { videoId },
      })
    );
    };
    ws.onclose = () => console.log("WS closed");
    ws.onerror = (err) => console.log("WS error", err);

    ws.onmessage = (event) => {
      const parsedEvent: INCOMING_MESSAGE = JSON.parse(event.data);

      switch (parsedEvent.type) {
        case "polls":
          console.log("Received list of polls:", parsedEvent.payload);
          setMessage(JSON.stringify(parsedEvent.payload));
          break;

        case "connection":
          console.log(parsedEvent.payload);
          setMessage(parsedEvent.payload)
          break;
      }
    };


    return () => ws.close();
  }, [videoId]);

  useEffect(() => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;

    socketRef.current.send(
      JSON.stringify({
        type: "get-polls",
        payload: { videoId },
      })
    );

  }, [ videoId]);

  return (
    <div>
      <div className="border p-3 rounded-lg shadow-sm bg-gray-50">
        <p className="font-semibold">Video ID:</p>
        <p className="text-sm break-all text-gray-500">{videoId}</p>
      </div>

      {message}

      <div className="border p-3 rounded-lg shadow-sm hover:bg-gray-50 mt-4">
        <p className="font-semibold">Example Poll</p>

        <div className="flex items-center gap-4 mt-2">
          <button className="px-3 py-1 rounded-lg bg-green-500 text-white">
            👍 120
          </button>
          <button className="px-3 py-1 rounded-lg bg-red-500 text-white">
            👎 12
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
