import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteChatAPI } from "../utils/api";

const Sidebar = ({ chats, setChats, activeId, onSelect, onNewChat }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDelete = async (e, chatId) => {
    e.stopPropagation();
    try {
      await deleteChatAPI(chatId);
      setChats((prev) => prev.filter((c) => c.id !== chatId));
    } catch {
      console.error("Delete failed");
    }
  };

  return (
<div className="w-72 h-screen bg-[#0B1020] text-white flex flex-col border-r border-slate-800">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-700">
        {/* <h1 className="text-lg font-semibold text-indigo-400">✳️ AI Assistant</h1> */}

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            ✨
          </div>

          <div>
            <h1 className="font-bold text-white">
              AI Assistant
            </h1>

            <p className="text-xs text-gray-400">
              Powered by AI
            </p>
          </div>
        </div>

      </div>

      {/* New Chat Button */}
      <div className="px-4 py-3">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-sm font-medium shadow-lg hover:scale-[1.02] transition"
        >
          <span className="text-lg leading-none">+</span> New Chat
        </button>
      </div>

      <div className="px-3 mb-3">
  <input
    type="text"
    placeholder="Search chats..."
    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-500"
  />
</div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        <p className="text-xs text-gray-500 uppercase tracking-wider px-2 mb-2">
          Recent Chats
        </p>

        {chats.length === 0 && (
          <p className="text-xs text-gray-600 px-2 py-4 text-center">
            No chats yet. Start a new one!
          </p>
        )}

        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`group flex items-center justify-between rounded-lg transition ${activeId === chat.id
                ? "bg-indigo-600/30 border border-indigo-500/40"
                : "hover:bg-gray-800"
              }`}
          >
            <button
              onClick={() => onSelect(chat.id)}
              className="flex-1 text-left px-3 py-2.5 text-sm truncate text-gray-300"
            >
              💬 {chat.title || "New Chat"}
            </button>

            {/* Delete button — hover pe dikhega */}
            <button
              onClick={(e) => handleDelete(e, chat.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 pr-2 transition text-lg leading-none"
              title="Delete chat"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* User Info + Logout */}
      <div className="border-t border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Profile icon click → Account page */}
          <button
            onClick={() => navigate("/account")}
            className="flex items-center gap-2 hover:bg-gray-800 rounded-lg px-2 py-1 transition min-w-0"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
              {(user.username || user.email || "U")[0].toUpperCase()}
            </div>
            <span className="text-sm text-gray-300 truncate">
              {user.username || user.email}
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="text-xs text-red-400 hover:text-red-300 transition flex-shrink-0 ml-2"
          >
            Logout
          </button>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;