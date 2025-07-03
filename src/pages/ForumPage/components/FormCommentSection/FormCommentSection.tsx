import { useLanguage } from '@/contexts/LanguageContext.utils';
import { useAuth } from '@/contexts/AuthContext';
import GenericFormCommentSection from '@/components/shared/GenericFormCommentSection/GenericFormCommentSection';
import { useForumComments } from '@/hooks/forums/useForumComments';
import { usePostForumComment } from '@/hooks/forums/usePostForumComment';
import CommentsSection from '../CommentsSection/CommentsSection';

export default function FormForumComment({ forumId }: { forumId: string }) {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  return (
    <GenericFormCommentSection
      id={forumId}
      useMainComments={useForumComments}
      usePostComment={usePostForumComment}
      isAuthenticated={isAuthenticated}
      t={t}
      testIdPrefix="forum-"
      CommentsSectionComponent={({ id }) => <CommentsSection forumId={id} />}
    />
  );
} 