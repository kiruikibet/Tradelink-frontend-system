import { Link,useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {useState} from "react";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { login } = useAuth();
  
  const navigate = useNavigate();

  const[formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
    rememberMe: false,
  });

  const [error , setError] = useState('');
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
   };
   
  const handlelogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData.usernameOrEmail, formData.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
      }
};



  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <section className="p-8 md:p-12">
          <h1 className="text-3xl font-bold">
            Welcome back to <span className="text-green-700">TradeLink</span>
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue buying, selling, and chatting with sellers.
          </p>
          {error && 
          <p className="text-red-600 mt-2">{error}
          </p>}

          <form className="mt-8 space-y-5"
            onSubmit={handlelogin}
          >
            <div>
              <label className="text-sm font-medium">Email or Username</label>
              <input
                required
                type="text"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                placeholder="Enter email or username"
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-700"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                required              
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-700"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <Link to="/forgot-password" className="text-green-700 font-medium">
                Forgot password?
              </Link>
            </div>

            <button className="w-full bg-green-800 text-white py-3 rounded-lg font-semibold"
              type="submit">
              Login
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-sm text-gray-400">or</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          <button className="w-full border border-gray-300 py-3 rounded-lg font-semibold flex items-center justify-center gap-3">
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-green-700 font-semibold">
              Create account
            </Link>
          </p>
        </section>

        <section className="hidden md:flex bg-green-50 p-12 items-center justify-center">
          <div className="text-center">
            <div className="text-8xl">🛒</div>
            <h2 className="text-2xl font-bold mt-6">Buy and sell with trust</h2>
            <p className="text-gray-600 mt-3">
              Discover products, follow sellers, and grow your marketplace network.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;