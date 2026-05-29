import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const ChatWindow = ({ messages, loading, input, setInput, onSend }) => {
  const bottomRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
const username = user.username;

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col flex-1 h-screen">

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-[#f8fafc]">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-4xl shadow-xl">
              ✨
            </div>

        <h1 className="mt-6 text-4xl font-bold text-slate-800">
  {username
    ? `Hello, ${username}! 👋`
    : "Welcome to AI Assistant 👋"}
</h1>

            <p className="text-slate-500 mt-3">
              What can I help with today?
            </p>

            <div className="grid grid-cols-2 gap-4 mt-10 max-w-2xl">

              {[
                "🚀 Build a MERN project",
                "💻 Debug my code",
                "📚 Explain DSA concepts",
                "🎯 Prepare for interview"
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setInput(item)}
                  className="bg-white border border-slate-200 rounded-2xl px-5 py-4 hover:border-indigo-400 hover:shadow-md transition text-left"
                >
                  {item}
                </button>
              ))}

            </div>

          </div>
        )}



        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {/* Avatar for assistant */}
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm mr-2 flex-shrink-0 mt-1">
                🤖
              </div>
            )}

            <div
              className={`max-w-[72%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user"
                  ? "bg-indigo-500 text-white rounded-br-none shadow-sm"
                  : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>

            {/* Avatar for user */}
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs text-white ml-2 flex-shrink-0 mt-1">
                {username ? username[0].toUpperCase() : "A"}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex justify-start items-end gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm flex-shrink-0">
              🤖
            </div>
            <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
              <div className="flex gap-1 items-center h-4">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Bar */}
      <div className="border-t bg-white px-6 py-4">
        <div className="flex gap-3 items-end max-w-4xl mx-auto">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // Auto-resize
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            placeholder="Ask me anything..."
            className="flex-1 resize-none px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-400 outline-none leading-relaxed overflow-hidden"
            style={{ minHeight: "46px", maxHeight: "120px" }}
          />
          <button
            onClick={onSend}
            disabled={loading || !input.trim()}
            className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-3 rounded-2xl text-sm font-medium transition flex items-center gap-2"
          >
            Send ➤
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">
          AI can make mistakes. Verify important information.
        </p>
      </div>

    </div>
  );
};

export default ChatWindow;