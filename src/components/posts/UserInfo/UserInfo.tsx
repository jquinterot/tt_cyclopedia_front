import React from "react";
import { useUser } from "../../../hooks/users/useUser";



interface UserInfoProps {
  userId: string;
}

const UserInfo = ({ userId }: UserInfoProps) => {
  const { user, isLoading, error } = useUser(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error || !user) return <div>Error fetching user</div>;

  return (
    <section className="flex justify-start items-center" data-testid="user-info">
      <img
        className="h-8 w-8 mr-2"
        alt="User avatar"
        data-testid="user-avatar"
      />
      <div className="mb-2" data-testid={`user-details-${user.id}`}>
        <p className="" data-testid={`username-${user.id}`}>{user.username}</p>
      </div>
    </section>
  );
};

const MemoizedUserInfo = React.memo(UserInfo);
export default MemoizedUserInfo;