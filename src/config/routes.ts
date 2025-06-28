import { lazy } from 'react';

// Lazy load components for better performance
const MainPage = lazy(() => import('@pages/MainPage/MainPage'));
const PostPage = lazy(() => import('@pages/PostPage/PostPage'));
const AboutPage = lazy(() => import('@pages/AboutPage/AboutPage'));
const LoginPage = lazy(() => import('@pages/LoginPage/LoginPage'));
const CreatePostPage = lazy(() => import('@pages/CreatePostPage/CreatePostPage'));
const SignupPage = lazy(() => import('@pages/SignupPage/SignupPage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage'));
const CreateForumPage = lazy(() => import('@pages/CreateForumPage/CreateForumPage'));
const ForumsPage = lazy(() => import('@pages/ForumsPage/ForumsPage'));
const ForumPage = lazy(() => import('@pages/ForumPage/ForumPage'));

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  title?: string;
  requiresAuth?: boolean;
  layout?: 'default' | 'auth' | 'none';
}

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  POST: '/posts/:id',
  CREATE_POST: '/createPost',
  CREATE_FORUM: '/create-forum',
  FORUMS: '/forums',
  FORUM: '/forums/:id',
  ABOUT: '/about',
  PROFILE: '/profile',
} as const;

export const routes: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    component: MainPage,
    title: 'Home',
    layout: 'default',
  },
  {
    path: ROUTES.LOGIN,
    component: LoginPage,
    title: 'Login',
    layout: 'auth',
  },
  {
    path: ROUTES.SIGNUP,
    component: SignupPage,
    title: 'Sign Up',
    layout: 'auth',
  },
  {
    path: ROUTES.POST,
    component: PostPage,
    title: 'Post Details',
    layout: 'default',
  },
  {
    path: ROUTES.CREATE_POST,
    component: CreatePostPage,
    title: 'Create Post',
    layout: 'default',
    requiresAuth: true,
  },
  {
    path: ROUTES.CREATE_FORUM,
    component: CreateForumPage,
    title: 'Create Forum',
    layout: 'default',
    requiresAuth: true,
  },
  {
    path: ROUTES.FORUMS,
    component: ForumsPage,
    title: 'Forums',
    layout: 'default',
  },
  {
    path: ROUTES.FORUM,
    component: ForumPage,
    title: 'Forum Details',
    layout: 'default',
  },
  {
    path: ROUTES.ABOUT,
    component: AboutPage,
    title: 'About',
    layout: 'default',
  },
  {
    path: ROUTES.PROFILE,
    component: ProfilePage,
    title: 'Profile',
    layout: 'default',
    requiresAuth: true,
  },
];

// Helper functions
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return routes.find(route => route.path === path);
};

export const isProtectedRoute = (path: string): boolean => {
  const route = getRouteByPath(path);
  return route?.requiresAuth ?? false;
};

export const generatePostPath = (postId: string): string => {
  return ROUTES.POST.replace(':id', postId);
};

export const generateForumPath = (forumId: string): string => {
  return ROUTES.FORUM.replace(':id', forumId);
}; 