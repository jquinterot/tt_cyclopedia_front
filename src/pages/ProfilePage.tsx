import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-red-400" data-testid="profile-login-required">You must be logged in to view your profile.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white/10 rounded-lg shadow" data-testid="profile-page">
      <h1 className="text-2xl font-bold mb-4 text-white" data-testid="profile-title">My Profile</h1>
      <div className="flex flex-col items-center mb-6">
        <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center mb-2" data-testid="profile-avatar">
          <span className="text-3xl font-bold text-white">{user.username.charAt(0).toUpperCase()}</span>
        </div>
        <span className="text-lg font-semibold text-gray-200" data-testid="profile-username">{user.username}</span>
      </div>
      <div className="space-y-2" data-testid="profile-details">
        <div>
          <span className="font-semibold text-gray-300">Username:</span>
          <span className="ml-2 text-white">{user.username}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Email:</span>
          <span className="ml-2 text-white">{user.email}</span>
        </div>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
} 