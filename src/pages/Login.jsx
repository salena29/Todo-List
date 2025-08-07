import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <label className="block mb-2">Username</label>
        <input className="w-full border rounded p-2 mb-4" onChange={(e) => setUsername(e.target.value)} />
        <label className="block mb-2">Password</label>
        <input type="password" className="w-full border rounded p-2 mb-4" onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600" onClick={handleLogin}>
          Login
        </button>
        <p className="text-sm mt-4 text-center text-gray-600 cursor-pointer" onClick={() => navigate("/register")}>
          Don't have an account? Sign up
        </p>
      </div>
    </div>
  );
};

export default Login;
