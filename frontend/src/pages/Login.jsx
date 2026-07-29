import { useState } from "react";
import PasswordInput from "../components/auth/PasswordInput";
import AuthInput from "../components/auth/AuthInput";
import AuthLayout from "../layouts/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };

    await axios
      .post("/api/user/login", payload, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        err.response.data;
      });
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Welcome back"
        subtitle="Enter your credentials to access your account."
      >
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-4">
            <AuthInput
              label="Email address"
              type="email"
              name="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="space-y-1.5">
              <PasswordInput
                label="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-end pt-1">
                <p className="text-xs font-medium text-black-600">
                  Don't have an account?{" "}
                  <Link
                    className="hover:text-gray-900
                  hover:underline"
                    to="/register"
                  >
                    Click Here
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Sign in
          </button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
