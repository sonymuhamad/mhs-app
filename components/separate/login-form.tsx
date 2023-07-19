"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // Add your login logic here, such as validating the credentials
    console.log("Username:", username);
    console.log("Password:", password);
    router.push("/dashboard");
  };

  return (
    <form className="max-w-sm mx-auto mt-8 p-8 bg-gray-200 rounded-lg shadow-md">
      <div className="mb-6">
        <label
          htmlFor="username"
          className="block text-gray-800 font-bold mb-2"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className="w-full px-4 py-3 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-800 font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-3 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
