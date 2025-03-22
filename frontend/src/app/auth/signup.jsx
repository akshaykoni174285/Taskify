"use client"

import { useState } from "react";

import { Router, useRouter } from "next/router";


const Signup = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      alert("Signup successful!");
      router.push("/auth/login");
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col">
          <input type="text" name="name" placeholder="Full Name" className="border p-2 mb-2" value={formData.name} onChange={handleChange} required />

          <input type="email" name="email" placeholder="Email" className="border p-2 mb-2" value={formData.email} onChange={handleChange} required />

          <input type="password" name="password" placeholder="Password" className="border p-2 mb-2" value={formData.password} onChange={handleChange} required />

          <input type="password" name="confirmPassword" placeholder="Confirm Password" className="border p-2 mb-2" value={formData.confirmPassword} onChange={handleChange} required />

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;