import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "@/hooks/users";
import { useAuth } from "@/contexts/AuthContext";
import { ErrorCode, ErrorMessages } from '@/enums/ErrorCode';
import toast, { Toaster } from "react-hot-toast";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");
    const loginMutation = useLogin();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const result = await loginMutation.mutateAsync({
                username: formData.username,
                password: formData.password
            });
            
            // Use the new authentication context
            login(result.access_token, result.user);
            toast.success("Successfully logged in!");
            navigate("/");
        } catch (err: unknown) {
            let message = ErrorMessages[ErrorCode.AUTH];
            if (err && typeof err === 'object' && 'response' in err) {
                const errorResponse = err as { response?: { data?: unknown, status?: number } };
                if (errorResponse.response?.status === 401) {
                    message = ErrorMessages[ErrorCode.AUTH];
                } else if (errorResponse.response?.data && typeof errorResponse.response.data === 'object' && 'detail' in errorResponse.response.data) {
                    // @ts-expect-error accessing detail property from backend error response
                    message = errorResponse.response.data.detail;
                }
            }
            setError(message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center font-sans text-white py-12 px-4 sm:px-6 lg:px-8" data-testid="login-page">
            <div className="max-w-md w-full">
                <div className="text-center mb-8" data-testid="login-header">
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <p className="mt-3 text-sm text-gray-300">
                        Sign in to TT Cyclopedia to continue your journey
                    </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                    <form onSubmit={handleSubmit} data-testid="login-form">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="username">
                                    Username
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        data-testid="username-input"
                                        className="w-full w-[22rem] px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        type="text"
                                        placeholder="Enter your username"
                                        autoComplete="username"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        data-testid="password-input"
                                        className="w-full w-[22rem] px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        type="password"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-md mt-4" data-testid="login-error">
                                {error}
                            </div>
                        )}
                        {loginMutation.status === 'pending' && (
                            <div className="text-blue-400 text-sm mt-4">Signing in...</div>
                        )}

                        <div className="flex flex-col gap-4 pt-6">
                            <button
                                type="submit"
                                data-testid="login-submit"
                                className="w-full px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loginMutation.status === 'pending'}
                            >
                                {loginMutation.status === 'pending' ? 'Signing in...' : 'Sign in'}
                            </button>
        
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-[#0f172a] text-gray-400">or</span>
                                </div>
                            </div>

                            <Link 
                                to="/signup" 
                                data-testid="signup-link"
                                className="w-full px-4 py-2 border border-white/10 rounded-md text-sm font-medium text-white hover:bg-white/5 transition-colors text-center"
                            >
                                Create new account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }}
            />
        </div>
    );
}

export default LoginPage;