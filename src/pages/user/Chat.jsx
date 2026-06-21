import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiArrowLeft, FiSend } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";
import { useAuth } from "../../context/AuthContext";

function Chat() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [input, setInput] = useState("");
  // TODO: replace with real WebSocket / API messages
  const [messages] = useState([]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    // TODO: send message via API/WebSocket
    setInput("");
  };

  return (
    <PageShell noFooter>
      <div className="max-w-3xl mx-auto px-4 py-4 flex flex-col" style={{ height: "calc(100vh - 160px)" }}>
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <button onClick={() => navigate("/user/messages")} className="text-gray-500 hover:text-gray-800">
            <FiArrowLeft size={20} />
          </button>
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-800">
            {username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-sm">{username}</p>
            <p className="text-xs text-gray-400">Seller</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {messages.length === 0 && (
            <p className="text-center text-sm text-gray-400 mt-10">
              Start the conversation with {username}
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.sender === user?.username ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${
                  m.sender === user?.username
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Agreements bar */}
        <div className="flex gap-2 mb-2">
          <button className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 hover:bg-gray-50 transition font-medium">
            + Purchase Agreement
          </button>
          <button className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 hover:bg-gray-50 transition font-medium">
            + Booking Agreement
          </button>
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="flex gap-2 border-t border-gray-100 pt-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500"
          />
          <button
            type="submit"
            className="w-11 h-11 bg-green-700 text-white rounded-xl flex items-center justify-center hover:bg-green-600 transition"
          >
            <FiSend size={16} />
          </button>
        </form>
      </div>
    </PageShell>
  );
}

export default Chat;
