import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans text-white py-12 px-4 sm:px-6 lg:px-8" data-testid="signup-page">
      <div className="max-w-md w-full space-y-8 p-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
        <div data-testid="signup-header">
          <h1 className="text-3xl font-bold text-center">Create Account</h1>
          <p className="mt-2 text-center text-sm text-gray-300">
            Join TT Cyclopedia community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6" data-testid="signup-form">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                data-testid="signup-username-input"
                className="mt-1 block w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                data-testid="signup-password-input"
                className="mt-1 block w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                data-testid="signup-confirm-password-input"
                className="mt-1 block w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              data-testid="signup-submit"
              className="w-full px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Account
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              data-testid="login-link"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 