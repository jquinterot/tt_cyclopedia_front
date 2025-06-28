import { memo } from "react";
import { useUser } from '@/hooks/users/useUser';
import Avatar from '@/components/Avatar/Avatar';

interface UserInfoProps {
  userId: string;
}

function UserAvatar() {
  // You can extend this to fetch user avatar from the user data
  // For now, we'll use the default avatar
  return (
    <Avatar
      size="sm"
      className="mr-2"
    />
  );
}

interface UserDetailsProps {
  id: string;
  username: string;
}

function UserDetails({ id, username }: UserDetailsProps) {
  return (
    <div className="mb-2" data-testid={`user-details-${id}`}>
      <p className="text-sm font-medium text-gray-200" data-testid={`username-${id}`}>{username}</p>
    </div>
  );
}

function UserInfo({ userId }: UserInfoProps) {
  const { user, isLoading, error } = useUser(userId);

  if (isLoading) return <div className="flex items-center space-x-2"><Avatar size="sm" /><span className="text-sm text-gray-400">Loading...</span></div>;
  if (error || !user) return <div className="flex items-center space-x-2"><Avatar size="sm" /><span className="text-sm text-gray-400">Unknown User</span></div>;

  return (
    <section className="flex justify-start items-center" data-testid="user-info">
      <UserAvatar />
      <UserDetails id={user.id} username={user.username} />
    </section>
  );
}

export default memo(UserInfo);