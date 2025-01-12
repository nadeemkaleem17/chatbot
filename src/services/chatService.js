// function to fetch the list of chats of specific User
// function to add new message user/bot to Chat
// function to add a new chat to user
// function to move to specific chat
// function to delete specific chat
function getSession() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const id = JSON.parse(sessionStorage.getItem("cbid"));
  return { id, token };
}
const URL_API = process.env.REACT_APP_URL_KEY;

export async function getUser() {
  const authData = getSession();
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authData.token}`,
    },
  };
  const response = await fetch(
    `${URL_API}/users/${authData.id}`,
    requestOptions
  );
  if (!response.ok) {
    // eslint-disable-next-line no-throw-literal
    throw { message: response.statusText, status: response.status };
  }
  const data = await response.json();
  return data;
}

export function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("cbid");
}

async function getChatList(userId) {
  const authData = getSession();
  const response = await fetch(`${URL_API}/users/${userId}/chats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authData.token}`,
    },
  });

  if (!response.ok) {
    // eslint-disable-next-line no-throw-literal
    throw { message: response.statusText, status: response.status };
  }
  const data = await response.json();
  return data[userId ? userId - 1 : authData.id - 1]?.chatList || []; // Assuming chats are stored in the 'chatList' array inside the first chat object
}

export const createNewChatInAPI = async (userId, newChat) => {
  const authData = getSession(); // Fetch session data
  try {
    // Step 1: Fetch user data
    const response = await fetch(`${URL_API}/chats/${userId}`);
    if (!response.ok) {
      throw new Error(`Error fetching user: ${response.statusText}`);
    }
    let userData = await response.json();

    // Step 2: Add new chat to the user's chatList
    const user = userData; // Find the specific user
    if (user) {
      user.chatList.push(newChat); // Add the new chat to the user's chatList
    } else {
      throw new Error("User not found");
    }

    // Step 3: Send updated user data back to the server
    const updateResponse = await fetch(`${URL_API}/chats/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData.token}`,
      },
      body: JSON.stringify({ chatList: user.chatList }), // Only send updated chatList
    });

    if (!updateResponse.ok) {
      throw new Error(`Error updating user: ${updateResponse.statusText}`);
    }

    // Step 4: Return the updated user data
    const updatedUser = await updateResponse.json();

    return updatedUser; // Return the updated user data
  } catch (error) {
    throw error; // Re-throw the error to handle it in the calling function
  }
};

async function addMessageInChatFromAPI(userId, chatId, message) {
  const authData = getSession();
  const response = await fetch(`${URL_API}/chats/${userId}`);
  const user = await response.json();
  // Find the user's chats

  user.chatList = user.chatList.map((singleChat) => {
    if (singleChat.id === chatId) {
      return {
        ...singleChat,
        messages: [...singleChat.messages, message], // Append the new message
      };
    }
    return singleChat; // Return the original chat object if the id doesn't match
  });

  const updateResponse = await fetch(`${URL_API}/chats/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authData.token}`,
    },
    body: JSON.stringify(user),
  });

  const updatedUser = await updateResponse.json();

  return updatedUser; // Return the updated user
}

export const fetchChatByIdFromAPI = async (userId, chatId) => {
  const response = await fetch(`${URL_API}/users/${userId}/chats/${chatId}`);
  const chat = await response.json();
  return chat;
};
export const deleteChatFromAPI = async (userId, chatId) => {
  const authData = getSession();
  try {
    // Step 1: Fetch the user data
    const response = await fetch(`${URL_API}/users/${userId}`);
    if (!response.ok) {
      throw new Error(`Error fetching user: ${response.statusText}`);
    }
    const userData = await response.json();

    // Step 2: Remove the chat from the user's chat list
    if (!userData.chats) {
      userData.chats = []; // Ensure chats array exists
    }

    // Filter out the chat with the specified chatId
    const updatedChats = userData.chats.filter(
      (chat) => chat.chatId !== chatId
    );

    // Update the user's chats array
    userData.chats = updatedChats;

    // Step 3: Update the user data on the server
    const updateResponse = await fetch(`${URL_API}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData.token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!updateResponse.ok) {
      throw new Error(`Error updating user: ${updateResponse.statusText}`);
    }

    // Step 4: Return the updated user data
    const updatedUser = await updateResponse.json();
    return updatedUser; // Return the updated user with the updated chats array
  } catch (error) {
    console.error("Error in deleteChatFromAPI:", error.message);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export { getChatList, addMessageInChatFromAPI };
