import { useParams } from "react-router-dom";
import { useForum } from '@/hooks/forums/useForum';
import FormForumComment from "../FormCommentSection/FormCommentSection";
import ForumInfoSection from '../ForumInfoSection/ForumInfoSection';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';

function ForumContent({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none text-sm sm:text-base" data-testid="forum-content">
      <p className="text-gray-300 text-xl leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  );
}

function ErrorMessage() {
  return (
    <div className="w-full max-w-4xl text-center p-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
      <p className="text-red-400">Error getting the forum by Id</p>
    </div>
  );
}

export default function ForumDetails() {
  const { id } = useParams();

  const { data: forum, error, isLoading, refetch } = useForum(id || '');

  if (error) return <ErrorMessage />;
  if (isLoading || !forum) return <LoadingSpinner />;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6" data-testid="forum-details-container">
      <div className="space-y-8">
        <h1 className="text-center text-5xl">{forum.title}</h1>
        <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 mb-6">
          <ForumContent content={forum.content} />
        </div>
        <ForumInfoSection forum={forum} refetch={refetch} />
      </div>
      <div className="mt-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-5" data-testid="forum-comments-section">
        {id && <FormForumComment forumId={id} />}
      </div>
    </div>
  );
} 