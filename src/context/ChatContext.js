import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import { ChatReducer } from "../reducer";
import {
  addMessageInChatFromAPI,
  createNewChatInAPI,
  deleteChatFromAPI,
  fetchChatByIdFromAPI,
  getChatList,
} from "../services/chatService";
const initialState = {
  chatList: [],
  currentChat: null,
  userId: null,
  total_chats: 0,
};

const ChatContext = createContext(initialState);

const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ChatReducer, initialState);

  function setUserId(id) {
    dispatch({ type: "SET_USER_ID", payload: { id: id } });
  }
  // For new user adding new chats

  const [loading, setLoading] = useState(true);

  function setCurrentChat(chat) {
    dispatch({ type: "SET_CURRENT_CHAT", payload: { chat: chat } });
  }

  function initialChatList(chats) {
    dispatch({ type: "INITIAL_CHAT_LIST", payload: { chats: chats } });
  }
  // Adding to backend
  async function addMessageInChat(userId, id, message) {
    dispatch({
      type: "ADD_MESSAGE",
      payload: { id: id, message: message },
    });
    try {
      // await addMessageInChatFromAPI(userId, chatId, message);
    } catch (err) {
      console.error("Error deleting chat", err);
    }
  }
  async function addNewChat(newChat) {
    try {
      // await createNewChatInAPI(userId, newChat);
      console.log("addNewChat: userId, NewChat", state.userId, newChat);
      dispatch({ type: "ADD_NEW_CHAT", payload: { newChat: newChat } });
    } catch (err) {
      console.error("Error adding chat", err);
    }
  }

  // deleting and other functoinalities
  async function deleteChat(userId, id) {
    try {
      await deleteChatFromAPI(userId, id);
      dispatch({ type: "DELETE_CHAT", payload: { id: id } });
    } catch (err) {
      console.error("Error deleting chat", err);
    }
  }

  async function switchToDifferentChat(id) {
    try {
      // const chat = await fetchChatByIdFromAPI(userId, id);
      dispatch({ type: "SET_CURRENT_CHAT", payload: { id: id } });
    } catch (err) {
      console.error("Error switching chat", err);
    }
  }
  const values = {
    chatList: state.chatList,
    currentChat: state.currentChat,
    userId: state.userId,
    total_chats: state.total_chats,
    initialChatList,
    addMessageInChat,
    addNewChat,
    deleteChat,
    switchToDifferentChat,
    setCurrentChat,
    dispatch,
    state,
    setUserId,
  };

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

// Global context of Cart
const useChat = () => {
  const context = useContext(ChatContext);
  return context;
};

export { useChat, ChatProvider };
