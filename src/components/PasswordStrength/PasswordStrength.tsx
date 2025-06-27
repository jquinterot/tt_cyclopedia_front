import { PasswordValidationResult } from '@/utils/security';

interface PasswordStrengthProps {
  validation: PasswordValidationResult;
  showDetails?: boolean;
}

export default function PasswordStrength({ validation, showDetails = false }: PasswordStrengthProps) {
  const { strength, errors } = validation;

  const getStrengthColor = () => {
    switch (strength) {
      case 'strong':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'weak':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStrengthText = () => {
    switch (strength) {
      case 'strong':
        return 'Strong';
      case 'medium':
        return 'Medium';
      case 'weak':
        return 'Weak';
      default:
        return 'Very Weak';
    }
  };

  const getStrengthWidth = () => {
    switch (strength) {
      case 'strong':
        return 'w-full';
      case 'medium':
        return 'w-2/3';
      case 'weak':
        return 'w-1/3';
      default:
        return 'w-0';
    }
  };

  return (
    <div className="mt-2">
      {/* Strength Bar */}
      <div className="flex items-center space-x-2 mb-2">
        <div className="flex-1 bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()} ${getStrengthWidth()}`}
            data-testid="password-strength-bar"
          />
        </div>
        <span className={`text-sm font-medium ${strength === 'strong' ? 'text-green-400' : strength === 'medium' ? 'text-yellow-400' : 'text-red-400'}`}>
          {getStrengthText()}
        </span>
      </div>

      {/* Error Messages */}
      {showDetails && errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-400 flex items-center">
              <span className="mr-1">•</span>
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Requirements Checklist */}
      {showDetails && (
        <div className="mt-3 space-y-1">
          <p className="text-xs text-gray-400 mb-2">Password Requirements:</p>
          <div className="grid grid-cols-1 gap-1 text-xs">
            <div className={`flex items-center ${validation.isValid ? 'text-green-400' : 'text-gray-400'}`}>
              <span className="mr-1">✓</span>
              At least 8 characters
            </div>
            <div className={`flex items-center ${/[A-Z]/.test(validation.errors.length > 0 ? '' : 'A') ? 'text-green-400' : 'text-gray-400'}`}>
              <span className="mr-1">✓</span>
              One uppercase letter
            </div>
            <div className={`flex items-center ${/[a-z]/.test(validation.errors.length > 0 ? '' : 'a') ? 'text-green-400' : 'text-gray-400'}`}>
              <span className="mr-1">✓</span>
              One lowercase letter
            </div>
            <div className={`flex items-center ${/\d/.test(validation.errors.length > 0 ? '' : '1') ? 'text-green-400' : 'text-gray-400'}`}>
              <span className="mr-1">✓</span>
              One number
            </div>
            <div className={`flex items-center ${/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(validation.errors.length > 0 ? '' : '!') ? 'text-green-400' : 'text-gray-400'}`}>
              <span className="mr-1">✓</span>
              One special character
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 