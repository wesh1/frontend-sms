"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      // If the call to the API was correct, redirect to /send-sms
      router.push('/send-sms');
    } else {
      const data = await res.json();

      // Print out the error if an error has ocurred
      setError(data.error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
      
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>

            <label className="block text-sm font-medium text-gray-700">Email</label>

            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-900 font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700">Password</label>
            
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-900 font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>
          
          {error && (
            <div className="mb-4 text-red-600 text-sm text-center">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
  
}
