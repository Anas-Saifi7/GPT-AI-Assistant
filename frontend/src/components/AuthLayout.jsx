import React from "react";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, title, subtitle, icon, accentColor = "indigo" }) => {
  const navigate = useNavigate();
  const colors = {
    indigo: { bg: "from-indigo-50 to-purple-50", icon: "bg-indigo-600", badge: "bg-indigo-100 text-indigo-600" },
    green:  { bg: "from-green-50 to-emerald-50", icon: "bg-emerald-600", badge: "bg-green-100 text-green-600" },
  };
  const c = colors[accentColor];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${c.bg} flex flex-col`}>

      {/* Top bar */}
      <div className="px-8 py-4 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="text-indigo-600 font-bold text-base flex items-center gap-2">
          ✳️ AI Assistant
        </button>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* Header */}
          <div className={`bg-gradient-to-br ${c.bg} px-8 py-8 text-center border-b border-gray-100`}>
            <div className={`w-14 h-14 ${c.icon} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg`}>
              {icon}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          </div>

          {/* Body */}
          <div className="px-8 py-7">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthLayout;