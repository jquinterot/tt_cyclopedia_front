import { getUsers } from "../../../hooks/users/getUsers";
import { User } from "../../../types/User";

export default function UserInfo() {
  const { users, isLoading, error } = getUsers();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users</div>;
  return (
    <section className="flex justify-start" data-testid="user-info">
      <img
        className="h-8 w-8 mr-2"
        src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
        alt="User avatar"
        data-testid="user-avatar"
      />
      {users?.map((user: User) => (
        <div key={user.id} className="mb-2" data-testid={`user-details-${user.id}`}>
          <p className="" data-testid={`username-${user.id}`}>{user.username}</p>
        </div>
      ))}
    </section>
  );
}
