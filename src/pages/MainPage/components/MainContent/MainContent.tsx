import React from 'react';
import PostList from '../PostList/PostList';

interface MainContentProps {
  children?: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex-grow flex justify-center px-4 py-8" data-testid="main-content">
      {children || <PostList />}
    </main>
  );
} 