"use client"
import { validateFrontendLogin } from "@/components/helpers/validateFrontendForms";
import Notification from "@/components/ui/Notification";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Access = () => {
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState(null)
  const router = useRouter()

  // input details for the forms
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})

  // Submit Data
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // const access = "user"

    const inputs = {
      email,
      password,
      rememberMe,
    }
    try {

      const body = validateFrontendLogin(inputs)
      // console.log(inputs);
      

      if (body.success) {
        const response  = await fetch('/api/auth/login', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body.data)
        })

        const result = await response.json()

        if (!response.ok) {
          setNotification({ 
            type: 'error',
            message: `Login failed 😢: ${result.error || 'Something went wrong'}`
          })
          console.log(result);
        }

        if (result.success) {
          setNotification({
            type: 'success',
            message: 'Login successful!! You are now logged into your account 🎉'
          })

          setTimeout(() => {
            // router.push('/dashboard')
            window.location.href = "/dashboard";
          }, 2000)
        } else {
          console.log(result.error);
          
          setNotification({
            type: 'error',
            message: `Login failed 😢: ${result.error}`
          })
        }

      } else {
        setErrors(body.errors);
      }
    } catch (error) {
      setNotification({ type: 'error', message: `Something went wrong. Please try again. ${error}` })
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      {notification && (
        <Notification
        type={notification.type && notification.type}
        message={notification.message && notification.message}
        onClose={() => setNotification(null)}
        />
      )}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        {/* Logo / Title */}
        <div className="text-center mb-8">
            <Link href="/" className="relative text-2xl font-bold poppins-bold-italic">
                <span className="text-[#0EA5A4]">Yield</span>
                <span className="text-[#0F172A]">Invest</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0EA5A4]"></span>
            </Link>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back! Please log in to continue.
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="you@example.com"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#0EA5A4] focus:border-[#0EA5A4]"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-[#0EA5A4] focus:border-[#0EA5A4]"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                onChange={(e) => setRememberMe(e.target.checked)}
                checked={rememberMe}
                className="mr-2 h-4 w-4 text-[#0EA5A4] border-gray-300 rounded focus:ring-[#0EA5A4]"
              />
              Remember me
            </label>
            {/* <a
              href="#"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Forgot password?
            </a> */}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#0EA5A4] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#387777] focus:ring-2 focus:ring-[#0EA5A4] transition cursor-pointer"
          >
            { loading ? "Authenticating...." : "Log In" }
          </button>
        </form>

        {/* Divider */}
        {/* <div className="my-6 border-t border-gray-200 dark:border-gray-700"></div> */}

        {/* Register Link */}
        {/* <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
            Sign up
          </a>
        </p> */}
      </div>
    </div>
  );
}

export default Access