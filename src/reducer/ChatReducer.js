export const ChatReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "INITIAL_CHAT_LIST":
      console.log(
        "updating chatList, updating the currentChat: ",
        console.log(payload.chats)
      );
      return {
        ...state,
        chatList: payload.chats,
        total_chats: payload.chats.length,
        currentChat: payload.chats[0],
      };
    case "ADD_MESSAGE":
      const updatedChats = state.chatList.map((chat) => {
        if (parseInt(chat.id) === parseInt(payload.id)) {
          return { ...chat, messages: [...chat.messages, payload.message] };
        }
        return chat;
      });
      return {
        ...state,
        chatList: updatedChats,
        /*currentChat: updatedChats.find((chat) => chat.chatId === payload.chatId),*/
      };
    case "ADD_NEW_CHAT":
      console.log(
        "ADD_NEW_CHAT: state.chatList, payload.newChat",
        state.chatList,
        payload.newChat
      );
      return {
        ...state,
        chatList: [...state.chatList, payload.newChat],
        total_chats: state.total_chats + 1,
        currentChat: payload.newChat,
      };
    case "DELETE_CHAT":
      const newChatsList = state.chatList.filter(
        (chat) => parseInt(chat.id) !== parseInt(payload.id)
      );
      const newCurrentChat =
        payload.id === state.currentChat.id
          ? {
              id: Date.now(), // Consider using UUID or a more robust method if needed
              messages: [
                { text: "Hi, how can I help you today?", sender: "bot" },
              ],
            }
          : state.currentChat;
      return {
        ...state,
        chatList: newChatsList,
        total_chats: state.total_chats - 1,
        currentChat: newCurrentChat,
      };
    case "SET_USER_ID":
      return { ...state, userId: payload.id };
    case "SWITCH_CHAT":
      return {
        ...state,
        currentChat: state.chatList.find((chat) => chat.id === payload.id),
      };
    case "SET_CURRENT_CHAT":
      return {
        ...state,
        currentChat: state.chatList.find((chat) => chat.id === payload.id),
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null, // Clears any errors if there's an error state
      };

    case "UPDATE_CURRENT_CHAT_MESSAGES": {
      const updatedMessages = [
        ...state.currentChat.messages,
        ...payload.newMessages,
      ];
      return {
        ...state,
        currentChat: { ...state.currentChat, messages: updatedMessages },
        chatList: state.chatList.map((chat) =>
          chat.id === state.currentChat.id
            ? { ...chat, messages: updatedMessages }
            : chat
        ),
      };
    }

    default:
      return state;
  }
};
