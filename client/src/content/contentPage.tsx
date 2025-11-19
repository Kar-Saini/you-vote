import { useState, useEffect } from "react";
import ExtensionDescription from "./components/ExtensionDescription";
import VideoPage from "./components/VideoPage";

const getVideoId = () => {
  const url = new URL(window.location.href);
  if (url.pathname === "/watch") return url.searchParams.get("v");

  if (url.pathname.startsWith("/shorts/"))
    return url.pathname.split("/shorts/")[1];

  return null;
};

const ContentPage = () => {
  const [expanded, setExpanded] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    const detectVideoChange = () => {
      const videoId = getVideoId();
      setVideoId(videoId);
    };

    detectVideoChange();

    const observer = new MutationObserver(detectVideoChange);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const isVideoPage = videoId !== null;

  return (
    <>
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="fixed bottom-6 right-6 z-[999999] bg-white! text-red-500 font-semibold text-xl px-5 py-3 rounded-2xl shadow-xl border border-red-400"
        >
          You-Vote
        </button>
      )}

      {expanded && (
        <div className="fixed bottom-6 right-6 z-[999999] w-80 bg-white! rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b bg-red-500 text-white">
            <h1 className="text-xl font-bold">You-Vote</h1>
            <button
              onClick={() => setExpanded(false)}
              className="text-white text-lg font-bold hover:opacity-80"
            >
              ✕
            </button>
          </div>

          <div className="p-4 max-h-72 overflow-y-auto space-y-4">
            {!isVideoPage && <ExtensionDescription />}
            {isVideoPage && <VideoPage videoId={videoId} />}
          </div>
        </div>
      )}
    </>
  );
};

export default ContentPage;
