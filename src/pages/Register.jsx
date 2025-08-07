import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.username === username)) {
      alert("Username already exists");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <label className="block mb-2">Username</label>
        <input className="w-full border rounded p-2 mb-4" onChange={(e) => setUsername(e.target.value)} />
        <label className="block mb-2">Password</label>
        <input type="password" className="w-full border rounded p-2 mb-4" onChange={(e) => setPassword(e.target.value)} />
        <label className="block mb-2">Confirm Password</label>
        <input type="password" className="w-full border rounded p-2 mb-4" onChange={(e) => setConfirmPassword(e.target.value)} />
        <button className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600" onClick={handleRegister}>
          Create Account
        </button>
        <p className="text-sm mt-4 text-center text-gray-600 cursor-pointer" onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
};

export default Register;
