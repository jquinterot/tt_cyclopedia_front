import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateForum } from '@/hooks/forums/useCreateForum';
import type { ForumCreate } from '@/types/Forum';
import { ErrorCode, ErrorMessages } from '@/enums/ErrorCode';

export default function CreateForumPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateForum();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim() || !content.trim()) {
      setError(ErrorMessages[ErrorCode.TITLE_CONTENT_REQUIRED]);
      return;
    }
    try {
      await mutateAsync({ title, content } as ForumCreate);
      navigate('/forums');
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as { response?: unknown }).response === 'object' &&
        (err as { response?: { data?: { detail?: string } } }).response !== null
      ) {
        const response = (err as { response?: { data?: { detail?: string } } }).response;
        setError(response?.data?.detail || ErrorMessages[ErrorCode.SERVER]);
      } else {
        setError(ErrorMessages[ErrorCode.SERVER]);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8" data-testid="create-forum-page">
      <h1 className="text-2xl font-bold mb-6 text-white" data-testid="create-forum-title">Create New Forum</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/80 p-6 rounded-lg shadow-lg border border-white/10" data-testid="create-forum-form">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
          <input
            id="title"
            type="text"
            className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={isPending}
            required
            data-testid="forum-title-input"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">Content</label>
          <textarea
            id="content"
            className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={6}
            disabled={isPending}
            required
            data-testid="forum-content-input"
          />
        </div>
        {error && <div className="text-red-400 text-sm" data-testid="forum-error-message">{error}</div>}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
            onClick={() => navigate('/forums')}
            disabled={isPending}
            data-testid="forum-cancel-button"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            disabled={isPending}
            data-testid="forum-submit-button"
          >
            {isPending ? 'Creating...' : 'Create Forum'}
          </button>
        </div>
      </form>
    </div>
  );
} 