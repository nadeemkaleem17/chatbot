import React from "react";
import { Dropdown, ListGroup } from "react-bootstrap";
import { HideDownArrow } from "../Elements/HideDownArrow";
import { useChat } from "../../context/ChatContext";
import "./ChatHistoryList.css";
export const ChatHistoryList = ({ chats }) => {
  const { chatList, deleteChat, userId, switchToDifferentChat, currentChat } =
    useChat();

  async function handleDeleteChat(id) {
    // chatList.find((chat) => parseInt(chat.id) === id);
    await deleteChat(userId, id);
  }
  function getDisplayMessage(chat) {
    let message = "";
    if (chat.messages.length > 1) {
      message = chat.messages[1].text + " user chat..." || "";
    } else {
      message = chat.messages[0].text || "";
    }

    const displayMessage = message.split(" ").slice(0, 5).join(" ");
    return displayMessage.length < message.length
      ? `${displayMessage}...`
      : displayMessage;
  }
  function handleSwitchChat(id) {
    const data = switchToDifferentChat(id);
    console.log(data);
    console.log(currentChat);
  }
  return (
    <ListGroup variant="flush">
      {chatList.map((chat) => (
        <ListGroup.Item
          key={chat.id}
          className="chat-list-item d-flex justify-content-between align-items-center"
        >
          <span
            style={{ cursor: "pointer" }}
            className="text-truncate"
            onClick={() => handleSwitchChat(chat.id)}
          >
            {getDisplayMessage(chat)}
          </span>
          <HideDownArrow />
          <Dropdown>
            <Dropdown.Toggle
              as="div" // Custom component to prevent caret
              id="dropdownUserAvatarButton"
              className="chat-item-menu-icon text-muted"
            >
              ⋯
            </Dropdown.Toggle>
            <Dropdown.Menu className="chat-item-menu-options">
              <Dropdown.Item
                as="button"
                className="text-danger"
                onClick={() => handleDeleteChat(chat.id)}
              >
                Delete Chat
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
