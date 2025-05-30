"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import LogoutButton from '../components/LogoutButton'

export default function SmsClient() {
  const router = useRouter()

  const [phone, setPhoneValue] = useState('')
  const [message, setMessageValue] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(event.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear form
    setPhoneValue('')
    setMessageValue('')
    setCountryCode('')
    setError('')
    
    const res = await fetch('/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ countryCode, phone, message }),
    });

    if (res.ok) {
      const data = await res.json();

      console.log(data[0])

      // Show success message
      setInfoMessage(`Message was sent correctly`)

      // Hide message after 10 seconds
      setTimeout(() => setInfoMessage(''), 10000)
      
      router.push('/send-sms');
    } else {
      const data = await res.json();
      setError(data.message);
    }

  }

  return (
    <div className="relative min-h-screen bg-gray-100 p-8">
      
      <LogoutButton />

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm space-y-4">
        
          <h2 className="text-xl font-semibold text-center text-gray-700">Send SMS</h2>

          <label className="block text-sm font-medium text-gray-700">Country code</label>

          <select id="my-select"
            required
            value={countryCode}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-900 font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select --</option>
            <option value="+502">+502 (Guatemala)</option>
            <option value="+503">+503 (El Salvador)</option>
          </select>

          <label className="block text-sm font-medium text-gray-700">Phone</label>

          <input
            pattern="^\d{8}$"
            title="Please enter exactly 8 digits"
            type="text"
            value={phone}
            onChange={(e) => setPhoneValue(e.target.value)}
            placeholder="00000000"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-900 font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <label className="block text-sm font-medium text-gray-700">Message</label>

          <textarea
            value={message}
            onChange={(e) => setMessageValue(e.target.value)}
            placeholder="Enter something..."
            className="w-full h-20 px-4 py-2 border border-gray-300 rounded-xl text-gray-900 font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Submit
          </button>

          {infoMessage && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded border border-green-300">
            {infoMessage}
            </div>
          )}

        </form>
      </div>
    </div>
  )

}
