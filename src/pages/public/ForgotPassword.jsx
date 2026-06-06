import {useState} from "react";
import {forgotPassword} from "../../services/passwordResetService";

export default function ForgotPassword(){
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    

    async function handlesubmit(e){
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
           const data= await forgotPassword(email);
            setMessage(data.message);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Forgot Password</h1>
            <p>Enter your email address to reset your password:</p>
            <form onSubmit={handlesubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Email"}
                </button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    );
}