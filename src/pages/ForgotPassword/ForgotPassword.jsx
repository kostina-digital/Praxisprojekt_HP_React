import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle password reset request here
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Check your email</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
            We've sent a password reset link to {email}
          </p>
          <Link
            to="/sign-in"
            className="block text-center text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="your@email.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Send reset link
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link
            to="/sign-in"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

