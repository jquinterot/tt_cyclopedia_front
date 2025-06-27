import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUser } from "@/hooks/users";
import { CreateUser } from "@/types/User";
import { 
  validatePassword, 
  validateUsername, 
  validatePasswordMatch, 
  validateEmail,
  sanitizeInput,
  RateLimiter,
  generateCSRFToken,
  validateCSRFToken,
  PasswordValidationResult,
  InputValidationResult
} from "@/utils/security";
import PasswordStrength from "@/components/PasswordStrength/PasswordStrength";
import toast from "react-hot-toast";

// Initialize rate limiter
const rateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes

interface ValidationState {
  username: InputValidationResult;
  email: InputValidationResult;
  password: PasswordValidationResult;
  confirmPassword: InputValidationResult;
}

export default function SignupPage() {
  const navigate = useNavigate();
  const createUserMutation = useCreateUser();
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validation, setValidation] = useState<ValidationState>({
    username: { isValid: true, errors: [] },
    email: { isValid: true, errors: [] },
    password: { isValid: true, errors: [], strength: 'weak' },
    confirmPassword: { isValid: true, errors: [] },
  });
  const [showPasswordDetails, setShowPasswordDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Generate CSRF token on component mount
  useEffect(() => {
    const token = generateCSRFToken();
    setCsrfToken(token);
    // Store token in sessionStorage for validation
    sessionStorage.setItem('csrfToken', token);
  }, []);

  const validateForm = () => {
    const usernameValidation = validateUsername(formData.username);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const confirmPasswordValidation = validatePasswordMatch(formData.password, formData.confirmPassword);

    setValidation({
      username: usernameValidation,
      email: emailValidation,
      password: passwordValidation,
      confirmPassword: confirmPasswordValidation,
    });

    return usernameValidation.isValid && emailValidation.isValid && passwordValidation.isValid && confirmPasswordValidation.isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));

    // Real-time validation
    if (name === 'username') {
      const usernameValidation = validateUsername(sanitizedValue);
      setValidation(prev => ({ ...prev, username: usernameValidation }));
    } else if (name === 'email') {
      const emailValidation = validateEmail(sanitizedValue);
      setValidation(prev => ({ ...prev, email: emailValidation }));
    } else if (name === 'password') {
      const passwordValidation = validatePassword(sanitizedValue);
      setValidation(prev => ({ ...prev, password: passwordValidation }));
      
      // Validate confirm password if it exists
      if (formData.confirmPassword) {
        const confirmPasswordValidation = validatePasswordMatch(sanitizedValue, formData.confirmPassword);
        setValidation(prev => ({ ...prev, confirmPassword: confirmPasswordValidation }));
      }
    } else if (name === 'confirmPassword') {
      const confirmPasswordValidation = validatePasswordMatch(formData.password, sanitizedValue);
      setValidation(prev => ({ ...prev, confirmPassword: confirmPasswordValidation }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup form submitted', formData);
    // Validate CSRF token
    const storedToken = sessionStorage.getItem('csrfToken');
    if (!validateCSRFToken(csrfToken, storedToken || '')) {
      console.log('CSRF validation failed', { csrfToken, storedToken });
      toast.error('Security validation failed. Please refresh the page and try again.');
      return;
    }

    // Check rate limiting
    const clientId = 'signup-form'; // In a real app, you might use IP or user agent
    if (!rateLimiter.isAllowed(clientId)) {
      console.log('Rate limiter blocked signup');
      toast.error(`Too many signup attempts. Please try again later.`);
      return;
    }

    // Validate form
    if (!validateForm()) {
      console.log('Form validation failed', validation);
      toast.error('Please fix the validation errors before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const userData: CreateUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      console.log('Calling createUserMutation.mutateAsync', userData);
      await createUserMutation.mutateAsync(userData);
      // Reset rate limiter on successful signup
      rateLimiter.reset(clientId);
      toast.success('Account created successfully! Welcome to TT Cyclopedia!');
      // Redirect to login page
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error: unknown) {
      console.error('Signup error:', error);
      // Handle specific error cases
      if (error && typeof error === 'object' && 'response' in error) {
        const errorResponse = error as { response?: { status?: number } };
        if (errorResponse.response?.status === 400) {
          toast.error('Username or email already exists. Please choose a different one.');
        } else {
          toast.error('Failed to create account. Please try again.');
        }
      } else {
        toast.error('Failed to create account. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputErrorClass = (fieldName: keyof ValidationState) => {
    return validation[fieldName].errors.length > 0 
      ? 'border-red-500 focus:ring-red-500' 
      : 'border-white/10 focus:ring-blue-500';
  };

  const getInputSuccessClass = (fieldName: keyof ValidationState) => {
    return validation[fieldName].isValid && formData[fieldName as keyof typeof formData] 
      ? 'border-green-500 focus:ring-green-500' 
      : '';
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

        <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-6" data-testid="signup-form">
          {/* Hidden CSRF token */}
          <input type="hidden" name="csrfToken" value={csrfToken} />
          
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
                className={`mt-1 block w-full w-[22rem] px-3 py-2 bg-white/5 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${getInputErrorClass('username')} ${getInputSuccessClass('username')}`}
                type="text"
                placeholder="Enter username"
                required
                minLength={3}
                maxLength={30}
              />
              {validation.username.errors.length > 0 && (
                <div className="mt-1 space-y-1">
                  {validation.username.errors.map((error, index) => (
                    <p key={index} className="text-sm text-red-400 flex items-center">
                      <span className="mr-1">•</span>
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                data-testid="signup-email-input"
                className={`mt-1 block w-full w-[22rem] px-3 py-2 bg-white/5 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${getInputErrorClass('email')} ${getInputSuccessClass('email')}`}
                type="email"
                placeholder="Enter email"
                required
                maxLength={255}
              />
              {validation.email.errors.length > 0 && (
                <div className="mt-1 space-y-1">
                  {validation.email.errors.map((error, index) => (
                    <p key={index} className="text-sm text-red-400 flex items-center">
                      <span className="mr-1">•</span>
                      {error}
                    </p>
                  ))}
                </div>
              )}
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
                onFocus={() => setShowPasswordDetails(true)}
                onBlur={() => setShowPasswordDetails(false)}
                data-testid="signup-password-input"
                className={`mt-1 block w-full w-[22rem] px-3 py-2 bg-white/5 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${getInputErrorClass('password')} ${getInputSuccessClass('password')}`}
                type="password"
                placeholder="Enter password"
                required
                minLength={8}
                maxLength={128}
              />
              <PasswordStrength 
                validation={validation.password} 
                showDetails={showPasswordDetails || validation.password.errors.length > 0}
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
                className={`mt-1 block w-full w-[22rem] px-3 py-2 bg-white/5 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${getInputErrorClass('confirmPassword')} ${getInputSuccessClass('confirmPassword')}`}
                type="password"
                placeholder="Confirm password"
                required
              />
              {validation.confirmPassword.errors.length > 0 && (
                <div className="mt-1 space-y-1">
                  {validation.confirmPassword.errors.map((error, index) => (
                    <p key={index} className="text-sm text-red-400 flex items-center">
                      <span className="mr-1">•</span>
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting || createUserMutation.isPending}
              data-testid="signup-submit"
              className="w-full px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting || createUserMutation.isPending ? 'Creating Account...' : 'Create Account'}
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