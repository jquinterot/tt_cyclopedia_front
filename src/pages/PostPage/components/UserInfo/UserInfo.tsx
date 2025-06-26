import React from "react";
import { useUser } from "../../../../hooks/users/useUser";

interface UserInfoProps {
  userId: string;
}

function UserAvatar() {
  return (
    <img
      className="h-8 w-8 mr-2"
      alt="User avatar"
      data-testid="user-avatar"
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
      <p className="" data-testid={`username-${id}`}>{username}</p>
    </div>
  );
}

function UserInfo({ userId }: UserInfoProps) {
  const { user, isLoading, error } = useUser(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error || !user) return <div>Error fetching user</div>;

  return (
    <section className="flex justify-start items-center" data-testid="user-info">
      <UserAvatar />
      <UserDetails id={user.id} username={user.username} />
    </section>
  );
}

export default React.memo(UserInfo);