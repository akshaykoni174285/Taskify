"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"



export default function AuthForm({ type }){
    const router = useRouter()
    const isSignup = type === "signup";

    // use the use state and only if isSignup is passed then only take 
    // the name and confirm password
    // otherwise just use email and password
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        ...(isSignup && { username: "", confirmPassword: "" }),
      });

    const [error, setError] = useState("");

    const handleChange = async (e)=>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        })
    }


    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(isSignup && formData.password !== formData.confirmPassword){
            setError("Passwords do not match");
            return;

        }

        setError("")

        try {
            
            const response = await fetch(`http://localhost:5000/auth/api/${type}`,{
                method: 'POST',
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if(!response.ok){
                setError(data.message || `${isSignup ? "signup" : "login"} has failed`);
                return;
            }

            if (data.token) {
              localStorage.setItem("token", data.token);
          } else {
              console.error("No token received from server");
          }
      
            alert(`${isSignup ? "Signup" : "Login"} successful!`);
      router.push(isSignup ? "/auth/login" : "/dashboard");

        } catch (error) {
            
            setError("Something went wrong. Try again.");

        }
    };


    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[url('/image.jpg')] bg-cover bg-center bg-gray-200 bg-white/10 backdrop-blur-md border border-white/20 rounded-4xl p-6">
      <div className="w-full max-w-lg bg-white/30 p-6 rounded-lg shadow-md backdrop-blur-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {isSignup && (
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              className="border px-3 py-3 rounded-4xl focus:ring focus:outline-none"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border px-3 py-3 rounded-4xl focus:ring focus:outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border px-3 py-3 rounded-4xl focus:ring focus:outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="border px-3 py-3 rounded-4xl focus:ring focus:outline-none"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <div className="mt-4 text-center">
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <a
                href={isSignup ? "/auth/login" : "/auth/signup"}
                className="text-blue-500 hover:underline"
              >
                {isSignup ? "Login" : "Sign Up"}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
    );

};


