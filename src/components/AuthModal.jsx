
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function AuthModal({ onClose }) {
  const { register, login, googleLogin } = useAuth();

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegistering) {
        await register(email, password);
      } else {
        await login(email, password);
      }

      onClose();
    } catch (err) {
      setError(
        err.code === "auth/email-already-in-use"
          ? "This email is already registered."
          : err.code === "auth/invalid-credential"
          ? "Incorrect email or password."
          : err.code === "auth/weak-password"
          ? "Password must be at least 6 characters."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);

    try {
      await googleLogin();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-[#205C45]">
            {isRegistering ? "Create Account" : "Welcome Back"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 text-2xl"
            aria-label="Close authentication form"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">
              Email address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-lg p-3"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full border rounded-lg p-3"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#205C45] text-white py-3 rounded-lg font-semibold disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : isRegistering
              ? "Register"
              : "Login"}
          </button>
        </form>

        <div className="text-center my-4 text-gray-500">
          OR
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-60"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm mt-5 text-gray-600">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError("");
            }}
            className="text-[#205C45] font-bold ml-1"
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
