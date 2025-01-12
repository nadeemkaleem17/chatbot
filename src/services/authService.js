const URL_API = process.env.REACT_APP_URL_KEY;
export function getSession() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const id = JSON.parse(sessionStorage.getItem("cbid"));
  return { id, token };
}

async function getUsersAfterLoggedIn() {
  const token = getSession();
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${URL_API}/users`, requestOptions);
  if (!response.ok) {
    // eslint-disable-next-line no-throw-literal
    throw { message: response.statusText, status: response.status };
  }
  const data = await response.json();
  return data;
}

async function login(userAuth) {
  const requestOptions = {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({
      email: userAuth.email,
      password: userAuth.password,
    }),
  };
  const response = await fetch(`${URL_API}/login`, requestOptions);
  if (!response.ok) {
    // eslint-disable-next-line no-throw-literal
    throw { message: response.statusText, status: response.status };
  }

  const data = await response.json();

  console.log(data.accessToken);
  if (data.accessToken) {
    sessionStorage.setItem("token", JSON.stringify(data.accessToken));
  }
  const users = await getUsersAfterLoggedIn();
  const user = users.find((user) => user.email === userAuth.email);
  sessionStorage.setItem("cbid", JSON.stringify(user.id));
  console.log("user after getting data", user);
  return user;
}

const register = async (userDetails) => {
  try {
    const response = await fetch(`${URL_API}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    if (!response.ok) {
      throw new Error("User registration failed.");
    }

    const user = await response.json(); // Get the registered user details
    console.log("User registered:", user);

    const { firstName, lastName, email } = userDetails;
    const res = await fetch(`${URL_API}/users`);
    const data = await res.json();
    const u_id = data.length;
    console.log("userId in register:", u_id);
    // Automatically create the chats object for the new user
    const chatPayload = {
      chatList: [],
      user: { firstName, lastName, email, id: u_id }, // Include the user id here
      id: user.id, // Same ID as the user
    };

    const chatResponse = await fetch(`${URL_API}/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chatPayload),
    });

    if (!chatResponse.ok) {
      throw new Error("Failed to create chats object.");
    }

    const chat = await chatResponse.json();
    console.log("Chats object created:", chat);

    if (user.accessToken) {
      sessionStorage.setItem("token", JSON.stringify(user.accessToken));
      sessionStorage.setItem("cbid", JSON.stringify(u_id));
    }
    return user; // Return the created user and chat objects
  } catch (error) {
    console.error("Error during registration:", error.message);
  }
};

export { register, login };
