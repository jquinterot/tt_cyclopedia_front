import Avatar from '@/components/Avatar/Avatar';

export function UserAvatar() {
  return (
    <Avatar size="sm" className="mr-2" />
  );
}

export interface UserDetailsProps {
  id: string;
  username: string;
}

export function UserDetails({ id, username }: UserDetailsProps) {
  return (
    <div className="mb-2" data-testid={`user-details-${id}`}>
      <p className="text-sm font-medium text-gray-200" data-testid={`username-${id}`}>{username}</p>
    </div>
  );
} 