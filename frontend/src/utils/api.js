const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/api/auth`;

// Signup
export const signupUser = async (Data) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(Data)
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// Login
export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
};

// Forgot Password
export const forgotPasswordAPI = async (email) => {
  const res = await fetch(`${BASE_URL}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};

// Reset Password
export const resetPasswordAPI = async (token, password, confirmPassword) => {
  const res = await fetch(`${BASE_URL}/reset-password/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, confirmPassword }),
  });
  return res.json();
};


// Chat History
export const fetchChatHistory = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL.replace("/auth", "/chat")}/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const fetchChatById = async (chatId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL.replace("/auth", "/chat")}/${chatId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const deleteChatAPI = async (chatId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL.replace("/auth", "/chat")}/${chatId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// Profile
export const getProfileAPI = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const updateProfileAPI = async (data) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};