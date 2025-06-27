
type FormActionsProps = {
  onCancel: () => void;
  isPending: boolean;
};

export default function FormActions({ onCancel, isPending }: FormActionsProps) {
  return (
    <div className="flex justify-end space-x-4">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
        data-testid="cancel-button"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-sm font-medium text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        data-testid="submit-button"
        disabled={isPending}
      >
        {isPending ? 'Creating...' : 'Create Post'}
      </button>
    </div>
  );
} 