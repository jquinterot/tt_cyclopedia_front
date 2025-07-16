import { useAuth } from '@/contexts/AuthContext';

export default function SessionStatus() {
  const { user, isAuthenticated, handleSessionExpiration, reloadPage } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
        <h3 className="text-lg font-semibold text-red-400 mb-2">Session Status</h3>
        <p className="text-red-300">Not authenticated</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
      <h3 className="text-lg font-semibold text-green-400 mb-2">Session Status</h3>
      <div className="space-y-2">
        <p className="text-green-300">
          <span className="font-medium">User:</span> {user?.username}
        </p>
        <p className="text-green-300">
          <span className="font-medium">Email:</span> {user?.email}
        </p>
        <p className="text-green-300">
          <span className="font-medium">Status:</span> Authenticated
        </p>
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSessionExpiration}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
            data-testid="expire-session-btn"
          >
            Simulate Session Expiration
          </button>
          <button
            onClick={reloadPage}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            data-testid="reload-page-btn"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
} 