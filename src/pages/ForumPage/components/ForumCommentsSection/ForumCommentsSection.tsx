import { ForumCommentTree } from "../ForumCommentTree";

export default function ForumCommentsSection({ forumId }: { forumId: string }) {
  return (
    <div className="space-y-4" data-testid="forum-comments-list">
      <ForumCommentTree forumId={forumId} />
    </div>
  );
} 