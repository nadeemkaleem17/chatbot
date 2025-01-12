import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Container } from "react-bootstrap";
import { InputText } from "./components/InputText";
import { ChatsSection } from "./components/ChatsSection";
import { getBotResponse } from "./chatUtils";
import { useChat } from "../../context/ChatContext";
import { getChatList } from "../../services/chatService";
import "./ChatPage.css";
export const ChatPage = () => {
  console.log("chatPage Rendered");
  const [loading, setLoading] = useState(false);
  const {
    addMessageInChat,
    userId,
    currentChat,
    addNewChat,
    setCurrentChat,
    dispatch,
    setUserId,
  } = useChat();
  const [msgstream, setMsgstream] = useState(false);
  async function addNewChatForNewUser() {
    try {
      const newChat = {
        id: Date.now(), // Use a unique ID
        messages: [{ text: "Hi, how can I help you today?", sender: "bot" }],
      };
      await addNewChat(newChat);
    } catch (error) {
      console.error("Error creating a new chat:", error);
    }
  }

  useEffect(() => {
    async function loadInitialChats() {
      if (!sessionStorage.getItem("token")) {
        return;
      }
      try {
        const chats = await getChatList(userId);
        if (!chats || chats.length === 0) {
          await addNewChatForNewUser();
        } else {
          dispatch({ type: "INITIAL_CHAT_LIST", payload: { chats: chats } });
        }
      } catch (error) {
        console.error("Error fetching initial chats:", error);
      } finally {
        setLoading(false);
      }
    }
    loadInitialChats();
  }, [userId]);

  const messages = React.useMemo(() => {
    return currentChat ? currentChat.messages : [];
  }, [currentChat]);

  const handleSendMessage = async (userMessage) => {
    if (!messages || messages.length === 0) {
      return;
    }
    setLoading(true);
    try {
      const newUserMessage = { text: userMessage, sender: "user" };
      const newBotMessage = {
        text: await getBotResponse(userMessage),
        sender: "bot",
      };
      newBotMessage.text = newBotMessage.text.replace(/\*/g, ""); // Clean up spaces
      dispatch({
        type: "UPDATE_CURRENT_CHAT_MESSAGES",
        payload: { newMessages: [newUserMessage, newBotMessage] },
      });
      setMsgstream(true);
      await addMessageInChat(userId, currentChat.id, newUserMessage);
      await addMessageInChat(userId, currentChat.id, newBotMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="chat-page-container d-flex flex-column">
      <div className="chats-section chat-page d-flex flex-column mx-5">
        {loading && <div className="chat-bot">Generating Response...</div>}
        {messages && messages.length > 0 ? (
          <ChatsSection messages={messages} msgstream={msgstream} />
        ) : (
          <p>Sorry Chat Is not available now...</p>
        )}
        <div>
          <InputText handleSendMessage={handleSendMessage} />
        </div>
      </div>
    </Container>
  );
};
