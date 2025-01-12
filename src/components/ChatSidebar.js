import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { ChatHistoryList } from "./layouts/ChatHistoryList";
import { useChat } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
import "./ChatSidebar.css";
export const ChatSidebar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { addNewChat, currentChat } = useChat();
  const newChat = {
    id: Date.now(),
    messages: [{ text: "Hi, how can I help you today?", sender: "bot" }],
  };
  async function handleChatClick() {
    if (currentChat.messages && currentChat.messages.length > 2) {
      await addNewChat(newChat);
    } else {
      navigate("/chat");
    }
  }
  const toggleSidebar = () => setShow(!show);

  return (
    <>
      <div className="side-bar-main position-fixed top-0 start-0 d-flex align-items-center">
        <i
          className="side-bar-icon fa-solid fa-bars"
          title="Toggle Sidebar"
          onClick={toggleSidebar}
        ></i>
        <i
          className="new-chat-icon fa-regular fa-message"
          title="New Chat"
          onClick={handleChatClick}
        ></i>
      </div>
      <Offcanvas show={show} onHide={toggleSidebar} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>History</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ChatHistoryList />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
