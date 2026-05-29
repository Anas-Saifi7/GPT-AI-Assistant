const express = require("express");
const router = express.Router();
const authmiddleware = require("../middleware/authMiddleware");
const Chat = require("../models/Chat.model");

//  Cloudflare AI helper
const getAIReply = async (message) => {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: message },
        ],
      }),
    }
  );
  const data = await response.json();
  return data.result?.response || "Something went wrong.";
};

//  Send message + save to DB
router.post("/", authmiddleware, async (req, res) => {
  const { message, chatId } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  try {
    const reply = await getAIReply(message);

    // Existing chat mein add karo ya naya banao
    let chat;
    if (chatId) {
      chat = await Chat.findOne({ _id: chatId, userId: req.user.id });
      if (chat) {
        chat.messages.push({ role: "user", text: message });
        chat.messages.push({ role: "assistant", text: reply });
        await chat.save();
      }
    }

    if (!chat) {
      chat = await Chat.create({
        userId: req.user.id,
        title: message.slice(0, 40),
        messages: [
          { role: "user", text: message },
          { role: "assistant", text: reply },
        ],
      });
    }

    res.status(200).json({ reply, chatId: chat._id });

  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ message: "AI response failed" });
  }
});

//  Fetch all chats of user
router.get("/history", authmiddleware, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.id })
      .sort({ updatedAt: -1 })
      .select("_id title updatedAt");

    res.status(200).json({ chats });
  } catch (error) {
    res.status(500).json({ message: "Error fetching chats" });
  }
});

//  Fetch single chat messages
router.get("/:chatId", authmiddleware, async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.chatId,
      userId: req.user.id,
    });

    if (!chat) return res.status(404).json({ message: "Chat not found" });

    res.status(200).json({ chat });
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat" });
  }
});

//  Delete a chat
router.delete("/:chatId", authmiddleware, async (req, res) => {
  try {
    await Chat.findOneAndDelete({
      _id: req.params.chatId,
      userId: req.user.id,
    });
    res.status(200).json({ message: "Chat deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting chat" });
  }
});

module.exports = router;