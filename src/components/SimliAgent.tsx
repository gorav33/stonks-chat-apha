import { DailyProvider } from "@daily-co/daily-react";
import { Link } from "react-router-dom";
import VideoBox from "./VideoBox";
import { useRef, useState } from "react";
import DailyIframe, { DailyCall } from "@daily-co/daily-js";
import cn from "../utils/TailwindMergeAndClsx";
import IconSparkleLoader from "@/media/IconSparkleLoader";

const SIMLI_API_KEY: string | undefined = import.meta.env
  .VITE_PUBLIC_SIMLI_API_KEY;
type SimliAgentProps = {
  onStart: () => void;
  onClose: () => void;
};

export const SimliAgent: React.FC<SimliAgentProps> = ({ onStart, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarVisible, setIsAvatarVisible] = useState(false);
  const [callObject, setCallObject] = useState<DailyCall | null>(null);
  const [chatbotId, setChatbotId] = useState<string | null>(null);
  const myCallObjRef = useRef<DailyCall | null>(null);

  const handleJoinRoom = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.simli.ai/startE2ESession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: SIMLI_API_KEY,
          faceId: "",
          voiceId: "",
          firstMessage: "",
          systemPrompt: "",
        }),
      });

      const data = await response.json();
      const roomUrl = data.roomUrl;
      console.log("API Response", data);

      const newCallObject =
        DailyIframe.getCallInstance() ||
        DailyIframe.createCallObject({ videoSource: false });

      newCallObject.setUserName("User");
      await newCallObject.join({ url: roomUrl });

      myCallObjRef.current = newCallObject;
      setCallObject(newCallObject);
      loadChatbot();
    } catch (error) {
      console.error("Failed to join room:", error);
      setIsLoading(false);
    }
  };

  const loadChatbot = async () => {
    if (!myCallObjRef.current) return setTimeout(loadChatbot, 500);

    const participants = myCallObjRef.current.participants();
    const chatbot = Object.values(participants).find(
      (p: any) => p.user_name === "Chatbot"
    );

    if (chatbot) {
      setChatbotId(chatbot.session_id);
      setIsLoading(false);
      setIsAvatarVisible(true);
      onStart();
    } else {
      setTimeout(loadChatbot, 500);
    }
  };

  const handleLeaveRoom = async () => {
    if (callObject) {
      await callObject.leave();
      setCallObject(null);
      setIsAvatarVisible(false);
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <>
      {isAvatarVisible && (
        <div className="h-[350px] w-[350px]">
          <DailyProvider callObject={callObject}>
            {chatbotId && <VideoBox key={chatbotId} id={chatbotId} />}
          </DailyProvider>
        </div>
      )}

      <div className="flex min-h-screen flex-col items-center">
        {!isAvatarVisible ? (
          <Link
            to="/simli-agent"
            onClick={(e) => {
              if (isLoading) e.preventDefault();
              else handleJoinRoom();
            }}
            className={cn(
              "w-full h-[52px] mt-4 bg-primary text-primary-foreground hover:bg-primary-glow hover:shadow-glow hover:scale-105 text-white py-3 px-6 rounded-md transition-all duration-300",
              " hover:text-white flex justify-center items-center",
              isLoading && "pointer-events-none opacity-70"
            )}
          >
            {isLoading ? (
              <div className="animate-spin">
                <IconSparkleLoader />
              </div>
            ) : (
              <span className="font-abc-repro-mono font-bold w-full text-center">
                GET ALPHA
              </span>
            )}
          </Link>
        ) : (
          <button
            onClick={handleLeaveRoom}
            className="mt-4 bg-red-600 text-white px-6 h-[52px] rounded-full hover:bg-white hover:text-red-600 transition-all duration-300"
          >
            Stop Interaction
          </button>
        )}
      </div>
    </>
  );
};
