import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import GenericFormCommentSection from '@/components/shared/GenericFormCommentSection/GenericFormCommentSection';
import { useMainComments } from '@/hooks/comments/useMainComments';
import { usePostComment } from '@/hooks/comments/usePostComments';
import Comments from '../CommentsSection/CommentsSection';

export default function FormComment({ postId }: { postId: string }) {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  return (
    <GenericFormCommentSection
      id={postId}
      useMainComments={useMainComments}
      usePostComment={usePostComment}
      isAuthenticated={isAuthenticated}
      t={t}
      testIdPrefix=""
      CommentsSectionComponent={({ id }) => <Comments postId={id} />}
    />
  );
}