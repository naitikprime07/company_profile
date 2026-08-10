// export default ChatBot;

import { useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ENVIRONMENT } from "../constants/environment";
import "./ChatBot.css";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi 👋 Welcome to Prime Softech! I'm your virtual assistant. How can I help you today? Feel free to ask about our services, projects, portfolio, or how to get in touch with our team.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    "What do you offer?",
    "Our portfolio",
    "How to contact you?",
  ];

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const message = text.trim();
    if (!message || loading) return;

    const newMessages = [...messages, { role: "user", text: message }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${ENVIRONMENT.apiBaseUrl}/chatbot/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Chat request failed");
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.reply || "I couldn't find an answer for that.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => sendMessage(input);

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button
          className="chatbot-toggle"
          type="button"
          aria-label="Open chat assistant"
          onClick={() => setIsOpen(true)}
        >
          <DotLottieReact
            src="https://lottie.host/17b5b323-b35d-428f-9897-8f59b5ce0229/ukmxX0F1du.lottie"
            loop
            autoplay
          />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>
              <strong>Prime Softech Assistant</strong>
              <small>Online · automated assistant</small>
            </span>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.role}`}>
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="message bot typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="quick-replies">
              {quickReplies.map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => sendMessage(q)}
                  disabled={loading}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="chatbot-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              disabled={loading}
              aria-label="Type your message"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
