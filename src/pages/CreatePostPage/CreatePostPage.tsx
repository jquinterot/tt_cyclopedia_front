import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePostForm from './components/CreatePostForm/CreatePostForm';
import { useAuth } from '@/contexts/AuthContext';

function CreatePostPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8" data-testid="create-post-page">
      <CreatePostForm/>
    </div>
  );
}

export default CreatePostPage;