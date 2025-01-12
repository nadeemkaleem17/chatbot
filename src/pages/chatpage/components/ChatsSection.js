import React, { useEffect, useTransition, useRef, useState } from "react";
import { streamText } from "../chatUtils";
import "./ChatsSection.css";
export const ChatsSection = ({ messages, msgstream }) => {
  const [streamedMessages, setStreamedMessages] = useState([]);
  const [isPending, startTransition] = useTransition(); // React Concurrent
  const chatEndRef = useRef(null);
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [streamedMessages]);

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage.sender === "bot" && msgstream) {
        startTransition(() => {
          streamText(latestMessage, messages, setStreamedMessages);
        });
      } else {
        setStreamedMessages([...messages]);
      }
    }
  }, [messages]);

  return (
    <div className="chat-history flex-grow-1 overflow-auto p-5 mb-3">
      {streamedMessages?.map((msg, index) => (
        <div
          key={index}
          className={`message d-flex ${
            msg.sender === "user"
              ? "justify-content-end"
              : "justify-content-start"
          }`}
        >
          <div
            className={`message-bubble p-3 mt-3 ${
              msg.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};
