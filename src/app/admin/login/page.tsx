"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import Link from "next/link";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        trimmedEmail,
        trimmedPassword
      );

      toast.success("Logged in successfully!");
      router.push("/admin");
    } catch (err: any) {
      const errorCode = err?.code || err?.error?.code || "";

      if (
        errorCode === "auth/user-not-found" ||
        errorCode === "auth/wrong-password"
      ) {
        toast.error("Invalid email or password.");
      } else if (errorCode === "auth/too-many-requests") {
        toast.error("Too many attempts. Try again later.");
      } else {
        toast.error(
          "Something went wrong." + (errorCode ? ` (${errorCode})` : "")
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl px-8 py-10 border border-[var(--line)]"
      >
        <h2 className="text-3xl font-bold text-center text-[var(--primary)] mb-6 tracking-tight drop-shadow">
          Admin Login
        </h2>

        <div className="mb-5">
          <label
            className="block text-sm font-semibold text-[var(--primary)] mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-[var(--line)] rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--primary)] pr-12 transition"
            placeholder="Enter your email"
            autoComplete="email"
          />
        </div>

        <div className="mb-7">
          <div className="flex items-center justify-between">
            <label
              className="block text-sm font-semibold text-[var(--primary)] mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <Link
              href="/admin/forgot-password"
              className="block text-sm text-right text-[var(--primary)] hover:underline underline tracking-wide"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-[var(--line)] rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--primary)] pr-12 transition"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--primary)] hover:text-[var(--btn-hover-bg)] transition focus:outline-none p-1 rounded-full bg-white/70 shadow"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a11.72 11.72 0 012.99-4.36m2.13-2.13A9.956 9.956 0 0112 5c5 0 9.27 3.11 11 7.5a11.72 11.72 0 01-4.06 5.44M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.857-.67 1.673-1.176 2.414M15.54 17.44A9.956 9.956 0 0112 19c-4.478 0-8.268-2.943-9.542-7a11.72 11.72 0 012.99-4.36"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[var(--primary)] text-white py-2.5 px-4 rounded-lg font-semibold shadow-lg hover:bg-[var(--btn-hover-bg)] transition-all duration-300 ease-in-out cursor-pointer ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
