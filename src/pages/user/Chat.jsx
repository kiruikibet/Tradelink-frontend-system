import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiSend } from "react-icons/fi";
import PageShell from "../../components/layout/PageShell";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/common/Loader";
import { createAgreement, getConversation, sendMessage, startConversation } from "../../services/marketplaceService";

function Chat() {
  const { username: conversationParam } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [agreementType, setAgreementType] = useState(null);
  const [agreementForm, setAgreementForm] = useState({
    amount: "",
    meetup_location: "",
    meetup_at: "",
  });

  useEffect(() => {
    const load = async () => {
      const data = /^\d+$/.test(conversationParam)
        ? await getConversation(conversationParam)
        : await startConversation({ seller: conversationParam });
      setConversation(data);
      setMessages(data.messages || []);
      setLoading(false);
    };
    load();
  }, [conversationParam]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !conversation) return;
    const message = await sendMessage(conversation.id, input.trim());
    setMessages((current) => [...current, message]);
    setInput("");
  };

  const handleCreateAgreement = async (e) => {
    e.preventDefault();
    const agreement = await createAgreement({
      conversation: conversation.id,
      product: conversation.product_id,
      agreement_type: agreementType,
      amount: agreementForm.amount,
      meetup_location: agreementForm.meetup_location,
      meetup_at: new Date(agreementForm.meetup_at).toISOString(),
    });
    setAgreementType(null);
    navigate(`/user/agreements/${agreement.id}`);
  };

  if (loading) return <PageShell noFooter><Loader fullScreen /></PageShell>;

  const otherUser = user?.username === conversation?.seller ? conversation?.buyer : conversation?.seller;
  const isSeller = user?.username === conversation?.seller;

  return (
    <PageShell noFooter>
      <div className="max-w-3xl mx-auto px-4 py-4 flex flex-col" style={{ height: "calc(100vh - 160px)" }}>
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <button onClick={() => navigate("/user/messages")} className="text-gray-500 hover:text-gray-800">
            <FiArrowLeft size={20} />
          </button>
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-800">
            {otherUser?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-sm">{otherUser}</p>
            <p className="text-xs text-gray-400">{conversation.product_name || "Marketplace chat"}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {messages.length === 0 && (
            <p className="text-center text-sm text-gray-400 mt-10">
              Start the conversation with {otherUser}
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
        {isSeller && conversation.product_id && (
          <div className="flex gap-2 mb-2">
            <button onClick={() => setAgreementType("purchase")} className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 hover:bg-gray-50 transition font-medium">
              + Purchase Agreement
            </button>
            <button onClick={() => setAgreementType("booking")} className="text-xs border border-gray-200 rounded-xl px-3 py-1.5 hover:bg-gray-50 transition font-medium">
              + Booking Agreement
            </button>
          </div>
        )}

        {agreementType && (
          <form onSubmit={handleCreateAgreement} className="mb-3 grid gap-2 bg-gray-50 border border-gray-100 rounded-xl p-3">
            <p className="text-sm font-semibold capitalize">{agreementType} agreement</p>
            <input required type="number" min="1" value={agreementForm.amount} onChange={(e) => setAgreementForm({ ...agreementForm, amount: e.target.value })} placeholder="Final agreed price" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            <input required value={agreementForm.meetup_location} onChange={(e) => setAgreementForm({ ...agreementForm, meetup_location: e.target.value })} placeholder="Meetup location" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            <input required type="datetime-local" value={agreementForm.meetup_at} onChange={(e) => setAgreementForm({ ...agreementForm, meetup_at: e.target.value })} className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            <div className="flex gap-2">
              <button type="submit" className="bg-green-700 text-white rounded-lg px-3 py-2 text-xs font-semibold">Create</button>
              <button type="button" onClick={() => setAgreementType(null)} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold">Cancel</button>
            </div>
          </form>
        )}

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
