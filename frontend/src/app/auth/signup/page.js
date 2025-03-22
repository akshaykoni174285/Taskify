"use client"

import { useState } from "react";
import { useRouter } from "next/navigation"; // Changed from next/router

export default function SignupPage() {
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
      const response = await fetch("http://localhost:5000/auth/api/register", {
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

// const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Form validation code...
    
//     try {
//       console.log("Attempting to connect to:", "http://localhost:5000/api/auth/signup");
//       console.log("With data:", formData);
      
//       // Your existing fetch code...
//     } catch (err) {
//       console.error("Error details:", err);
//       setError("Connection failed. Is the backend server running?");
//     }
//   };
  return (
    <div className="flex flex-column justify-center items-center h-screen bg-grey-200">
      <div className="">
        <h2 className="">Sign Up</h2>

        {error && <p className="">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col">
          <input 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            className="" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />

          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            className="" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />

          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            className="" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />

          <input 
            type="password" 
            name="confirmPassword" 
            placeholder="Confirm Password" 
            className="" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            required 
          />

          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition"
          >
            Sign Up
          </button>
          
          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              <a href="/auth/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}