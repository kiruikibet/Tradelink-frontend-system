import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {useState} from "react";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate= useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    password2: '',
    agreeTerms: false,
  });
   const [error, setError] = useState('');  
    const handleChange = (e) => { 
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
   };

const handleRegister = async (e) => {
  e.preventDefault();
  setError("");

  if (formData.password.length < 8) {
    setError("Password must be at least 8 characters.");
    return;
  }

  if (formData.password !== formData.password2) {
    setError("Passwords do not match.");
    return;
  }

  try {
    await register(formData.username, formData.email, formData.password);
    navigate("/");
  } catch (error) {
    setError(error.message);
  }
};
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <section className="hidden md:flex bg-green-50 p-12 items-center justify-center">
          <div className="text-center">
            <div className="text-8xl">📦</div>
            <h2 className="text-2xl font-bold mt-6">
              Start your TradeLink journey
            </h2>
            <p className="text-gray-600 mt-3">
              Create an account to buy, sell, follow sellers, and post products.
            </p>
          </div>
        </section>

        <section className="p-8 md:p-12">
          <h1 className="text-3xl font-bold">
            Create your <span className="text-green-700">TradeLink</span> account
          </h1>

          <p className="text-gray-500 mt-2">
            Join the marketplace and start trading today.
          </p>
          {error && 
          <p className="text-red-600 mt-2">{error}
          </p>}

          <form className="mt-8 space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                required
                name="fullName" 
                value={formData.fullName}
                onChange={handleChange}   
                type="text"
                placeholder="Enter full name"
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-700"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Username</label>
              <input
                required
                name="username"
                value={formData.username}
                onChange={handleChange} 
                type="text"
                placeholder="Choose username"
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-700"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter email"
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-700"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                required
                name = "password"
                value = {formData.password}
                onChange = {handleChange}
                type="password"
                placeholder="Create password"
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-700"
              />
            </div>
            <div>
              <label className="text-sm font-medium"> Confirm Password</label>
              <input
                required
                name = "password2"
                value = {formData.password2}
                onChange = {handleChange}
                type="password"
                placeholder="Confirm password"
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-700"
              />
            </div>

            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input type="checkbox" className="mt-1" />
              I agree to the Terms and Privacy Policy.
            </label>

            <button
            type= "submit"
             className="w-full bg-green-800 text-white py-3 rounded-lg font-semibold">
              Create Account
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-sm text-gray-400">or</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          <button className="w-full border border-gray-300 py-3 rounded-lg font-semibold flex items-center justify-center gap-3">
            <FcGoogle className="text-2xl" />
            Sign up with Google
          </button>

          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 font-semibold">
              Login
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default Register;