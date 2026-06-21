import { Link } from "react-router-dom";
import { FiShield, FiMessageCircle, FiTrendingUp, FiArrowRight } from "react-icons/fi";

const benefits = [
  {
    icon: <FiShield className="text-3xl text-green-700" />,
    title: "Escrow Protection",
    desc: "Funds are held securely until both parties confirm the deal.",
  },
  {
    icon: <FiMessageCircle className="text-3xl text-green-700" />,
    title: "In-App Negotiation",
    desc: "Chat, negotiate price, and close deals without leaving the platform.",
  },
  {
    icon: <FiTrendingUp className="text-3xl text-green-700" />,
    title: "Seller Analytics",
    desc: "Track views, sales, and performance from your dashboard.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            Trade<span className="text-green-700">Link</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-green-700">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-600 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-b from-green-50 to-white">
        <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-6">
          Kenya's Trusted Marketplace
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight max-w-3xl">
          Buy & Sell with <span className="text-green-700">Confidence</span>
        </h1>
        <p className="text-gray-500 mt-6 text-lg max-w-xl">
          TradeLink connects buyers and sellers with escrow protection, real-time chat, and
          seamless agreements — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            to="/register"
            className="bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-green-600 transition flex items-center gap-2"
          >
            Start for Free <FiArrowRight />
          </Link>
          <Link
            to="/"
            className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-base hover:bg-gray-50 transition"
          >
            Browse Marketplace
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {benefits.map((b) => (
          <div key={b.title} className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center">
              {b.icon}
            </div>
            <h3 className="text-lg font-bold">{b.title}</h3>
            <p className="text-gray-500 text-sm">{b.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-green-700 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold">Ready to get started?</h2>
        <p className="mt-3 text-green-100">
          Join thousands of buyers and sellers on TradeLink.
        </p>
        <Link
          to="/register"
          className="inline-block mt-8 bg-white text-green-800 font-semibold px-8 py-4 rounded-xl hover:bg-green-50 transition"
        >
          Create a Free Account
        </Link>
      </section>

      <footer className="text-center text-sm text-gray-400 py-6">
        © 2025 TradeLink. All rights reserved.
      </footer>
    </div>
  );
}

export default Landing;
