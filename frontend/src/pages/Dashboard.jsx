import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { fetchChatHistory, fetchChatById } from "../utils/api";

const Dashboard = () => {

const [search, setSearch] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [chats, setChats] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);

  
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const tokenFromGoogle = params.get("token");
  const userFromGoogle = params.get("user");

  if (tokenFromGoogle) {
    localStorage.setItem("token", tokenFromGoogle);
    if (userFromGoogle) {
      localStorage.setItem(
  "user",
  JSON.stringify(
    JSON.parse(
      decodeURIComponent(userFromGoogle)
    )
  )
);
    }
    window.history.replaceState({}, "", "/dashboard");

    setUser(JSON.parse(decodeURIComponent(userFromGoogle)));
  }
}, []);

  
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchChatHistory();
        if (data.chats) {
          setChats(
            data.chats.map((c) => ({
              id: c._id,
              title: c.title,
              messages: [],
            }))
          );
        }
      } catch {
        console.error("Failed to load chat history");
      } finally {
        setHistoryLoading(false);
      }
    };
    loadHistory();
  }, []);

  const handleNewChat = () => {
    setActiveId(null);
    setMessages([]);
  };

  
  const handleSelectChat = async (id) => {
    try {
      const data = await fetchChatById(id);
      if (data.chat) {
        setActiveId(id);
        setMessages(data.chat.messages);
      }
    } catch {
      console.error("Failed to load chat");
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const sentInput = input;
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: sentInput,
          chatId: activeId,
        }),
      });

      const data = await res.json();
      const aiMsg = {
        role: "assistant",
        text: data.reply || "Something went wrong.",
      };

      setMessages((prev) => [...prev, aiMsg]);

      if (!activeId && data.chatId) {
        setActiveId(data.chatId);
        setChats((prev) => [
          {
            id: data.chatId,
            title: sentInput.slice(0, 40),
            messages: [],
          },
          ...prev,
        ]);
      } else {
        
        setChats((prev) =>
          prev.map((c) =>
            c.id === activeId
              ? { ...c, title: c.title === "New Chat" ? sentInput.slice(0, 40) : c.title }
              : c
          )
        );
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Error connecting to server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar
        chats={chats}
        setChats={setChats}      
        activeId={activeId}
        onSelect={handleSelectChat}
        onNewChat={handleNewChat}
      />
      <div className="flex-1 overflow-hidden">
        {historyLoading ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Loading...
          </div>
        ) : (
          <ChatWindow
            messages={messages}
            loading={loading}
            input={input}
            setInput={setInput}
            onSend={handleSend}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;