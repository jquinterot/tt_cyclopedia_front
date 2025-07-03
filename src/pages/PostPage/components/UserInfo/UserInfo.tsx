import { memo } from "react";
import { useUser } from '@/hooks/users/useUser';
import { UserAvatar, UserDetails } from './UserInfoParts';

interface UserInfoProps {
  userId: string;
}

const UserInfo = function UserInfo({ userId }: UserInfoProps) {
  const { user, isLoading, error } = useUser(userId);

  if (isLoading) return <div className="flex items-center space-x-2"><UserAvatar /><span className="text-sm text-gray-400">Loading...</span></div>;
  if (error || !user) return <div className="flex items-center space-x-2"><UserAvatar /><span className="text-sm text-gray-400">Unknown User</span></div>;

  return (
    <section className="flex justify-start items-center" data-testid="user-info">
      <UserAvatar />
      <UserDetails id={user.id} username={user.username} />
    </section>
  );
};

export default memo(UserInfo);