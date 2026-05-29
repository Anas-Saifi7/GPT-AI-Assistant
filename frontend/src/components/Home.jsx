import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-white to-[#f5f3ff] text-gray-800">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-10 py-4 bg-white/80 backdrop-blur-md shadow-sm border-b border-indigo-100">
        <h1 className="text-lg font-bold flex items-center gap-2 text-indigo-600">
          ✳️ AI Assistant
        </h1>
        <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
          {["Features", "How it Works", "Use Cases", "Pricing", "Blog"].map((item) => (
            <li key={item} className="hover:text-indigo-600 cursor-pointer transition">{item}</li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-5 py-2 rounded-xl font-semibold shadow-md transition"
          >
            Get Started →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-10 items-center px-10 py-24 max-w-7xl mx-auto">
        {/* LEFT */}
        <div>
          <span className="bg-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-semibold">
            ✨ Your Intelligent AI Companion
          </span>

          <h1 className="text-5xl font-extrabold mt-6 leading-tight text-gray-900">
            Smarter Solutions,<br />
            Powered by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              AI
            </span>
          </h1>

          <p className="text-gray-500 mt-5 max-w-lg text-base leading-relaxed">
            AI Assistant helps you write, analyze, brainstorm, and automate tasks
            in seconds. Save time and boost productivity.
          </p>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate("/signup")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition"
            >
              🚀 Try AI Assistant Now
            </button>
            <button className="bg-white border border-gray-200 hover:border-indigo-300 shadow-sm px-6 py-3 rounded-xl font-semibold text-gray-700 transition">
              ▶ Watch Demo
            </button>
          </div>

          {/* USERS */}
          <div className="flex items-center gap-3 mt-8">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/40?img=${i}`}
                  className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Trusted by{" "}
              <span className="text-indigo-600 font-bold">10,000+</span> users
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center items-center min-h-[320px]">
          <div className="absolute w-80 h-80 bg-indigo-300 rounded-full blur-[100px] opacity-20"></div>

          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
            className="w-56 z-10 drop-shadow-2xl"
          />

          {[
            { text: "✍️ AI Writing", sub: "Create content fast", pos: "top-4 left-0" },
            { text: "📊 Data Analysis", sub: "Instant insights", pos: "top-8 right-0" },
            { text: "💡 Brainstorm", sub: "Ideas on demand", pos: "bottom-16 left-0" },
            { text: "⚙️ Automation", sub: "Save your time", pos: "bottom-4 right-0" },
          ].map((card, i) => (
            <div
              key={i}
              className={`absolute ${card.pos} bg-white/90 backdrop-blur border border-white shadow-lg p-3 rounded-xl z-10`}
            >
              <p className="text-xs font-bold text-gray-800">{card.text}</p>
              <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
            </div>
          ))}

          {/* Input box */}
          <div
            onClick={() => navigate("/signup")}
            className="absolute -bottom-8 bg-white shadow-2xl border border-indigo-100 rounded-full px-5 py-3 flex items-center gap-3 w-72 cursor-pointer hover:border-indigo-300 transition z-20"
          >
            <input
              readOnly
              placeholder="Ask me anything..."
              className="outline-none flex-1 text-sm text-gray-400 cursor-pointer bg-transparent"
            />
            <button className="bg-indigo-500 text-white px-3 py-1.5 rounded-full text-sm">
              ➤
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-10 py-24 mt-8 text-center bg-gray-50">
        <span className="bg-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-semibold">
          ⚡ Features
        </span>
        <h2 className="text-3xl font-extrabold mt-4 text-gray-900">
          Everything You Need,{" "}
          <span className="text-indigo-600">All in One Place</span>
        </h2>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
          Powerful features designed to make your work easier and faster.
        </p>

        <div className="grid md:grid-cols-4 gap-6 mt-12">
          {[
            { title: "AI Writing", icon: "✍️", desc: "Generate blogs, emails & content instantly." },
            { title: "Data Analysis", icon: "📊", desc: "Understand your data with smart insights." },
            { title: "Brainstorm Ideas", icon: "💡", desc: "Get creative ideas for any project." },
            { title: "Task Automation", icon: "⚙️", desc: "Automate repetitive work in seconds." },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white border border-gray-200 hover:border-indigo-300 rounded-2xl p-6 text-left hover:shadow-lg transition cursor-pointer"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-indigo-100 transition">
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              <button
                onClick={() => navigate("/signup")}
                className="text-indigo-600 text-sm mt-4 font-semibold hover:underline"
              >
                Learn more →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="px-10 py-16">
        <div className="grid md:grid-cols-4 bg-white border border-indigo-100 rounded-2xl shadow-sm p-8 max-w-5xl mx-auto text-center">
          {[
            { num: "10,000+", label: "Happy Users" },
            { num: "50,000+", label: "Tasks Completed" },
            { num: "2M+", label: "Hours Saved" },
            { num: "4.9/5", label: "User Rating" },
          ].map((stat, i) => (
            <div key={i} className={i < 3 ? "border-r border-indigo-100" : ""}>
              <h3 className="text-2xl font-extrabold text-indigo-600">{stat.num}</h3>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-10 py-16 text-center">
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
          <h2 className="text-3xl font-extrabold mb-4">
            Ready to get started?
          </h2>
          <p className="text-indigo-200 mb-8">
            Join 10,000+ users who are already saving time with AI Assistant.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold text-base hover:bg-indigo-50 transition shadow-lg"
          >
            🚀 Start for Free
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 px-10 py-6 flex items-center justify-between text-sm text-gray-400">
        <span className="font-semibold text-indigo-600">✳️ AI Assistant</span>
        <span>© 2026 AI Assistant. All rights reserved.</span>
        <div className="flex gap-6">
          <span className="hover:text-indigo-600 cursor-pointer">Privacy</span>
          <span className="hover:text-indigo-600 cursor-pointer">Terms</span>
          <span className="hover:text-indigo-600 cursor-pointer">Contact</span>
        </div>
      </footer>

    </div>
  )
}

export default Home