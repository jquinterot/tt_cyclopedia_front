export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center" data-testid="loading-spinner">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" data-testid="loading-spinner-icon"></div>
      <span className="ml-3 text-white" data-testid="loading-text">Loading...</span>
    </div>
  );
};

export default LoadingSpinner; 