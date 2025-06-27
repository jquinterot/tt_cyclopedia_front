import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES, generatePostPath } from '@/config/routes';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToHome = () => navigate(ROUTES.HOME);
  const goToLogin = () => navigate(ROUTES.LOGIN);
  const goToSignup = () => navigate(ROUTES.SIGNUP);
  const goToAbout = () => navigate(ROUTES.ABOUT);
  const goToCreatePost = () => navigate(ROUTES.CREATE_POST);
  const goToPost = (postId: string) => navigate(generatePostPath(postId));
  
  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);
  
  const isCurrentPath = (path: string) => location.pathname === path;
  const isCurrentRoute = (route: keyof typeof ROUTES) => location.pathname === ROUTES[route];

  return {
    // Navigation functions
    goToHome,
    goToLogin,
    goToSignup,
    goToAbout,
    goToCreatePost,
    goToPost,
    goBack,
    goForward,
    
    // Current location helpers
    currentPath: location.pathname,
    isCurrentPath,
    isCurrentRoute,
    
    // Route constants
    ROUTES,
  };
}; 