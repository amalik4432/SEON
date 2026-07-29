import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../Components/auth/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios.js";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    await axios
      .post("/api/user/register", payload, {
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
    <div>
      <AuthLayout>
        <AuthCard
          title="Sign Up"
          subtitle="Welcome fill the form to Signup now"
        >
          <form onSubmit={handleRegister} className="space-y-5" action="">
            <div>
              <AuthInput
                label="Email"
                type="email"
                placeholder="Enter Your Email Here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
            </div>
            <div>
              <PasswordInput
                label="Password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
            </div>

            <p className="text-xs font-medium text-gray-600 ">
              Already have an account?{" "}
              <Link className="hover:text-gray-900 hover:underline" to="/login">
                Click Here
              </Link>
            </p>
            <button
              type="submit"
              className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Sign up
            </button>
          </form>
        </AuthCard>
      </AuthLayout>
    </div>
  );
};

export default Register;
