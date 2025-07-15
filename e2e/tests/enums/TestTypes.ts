export enum UserState {
  LOGGED_IN = 'logged_in',
  LOGGED_OUT = 'logged_out'
}

export enum TestCategory {
  AUTHENTICATION = 'authentication',
  UI_BEHAVIOR = 'ui_behavior',
  NAVIGATION = 'navigation',
  HEART_ICONS = 'heart_icons',
  PROTECTED_ROUTES = 'protected_routes',
  MOBILE = 'mobile',
  API = 'api'
}

export enum ViewportSize {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop'
}

export enum TestData {
  VALID_USERNAME = 'testuser',
  VALID_EMAIL = 'test@example.com',
  VALID_PASSWORD = 'TestPassword123!',
  INVALID_EMAIL = 'not-an-email',
  INVALID_PASSWORD = 'weak'
}

export enum TestIds {
  // Navigation
  NAV_LOGIN = 'nav-login',
  NAV_POSTS = 'nav-posts',
  NAV_FORUMS = 'nav-forums',
  NAV_ABOUT = 'nav-about',
  
  // User Profile
  USER_PROFILE = 'user-profile',
  USER_PROFILE_TRIGGER = 'user-profile-trigger',
  CREATE_POST_BUTTON = 'create-post-button',
  
  // Mobile Menu
  MOBILE_MENU_BUTTON = 'mobile-menu-button',
  MOBILE_MENU = 'mobile-menu',
  MOBILE_NAV_LOGIN = 'mobile-nav-login',
  MOBILE_USER_PROFILE_DROPDOWN = 'mobile-user-profile-dropdown',
  MOBILE_USERNAME = 'mobile-username',
  MOBILE_DROPDOWN_PROFILE_LINK = 'mobile-dropdown-profile-link',
  MOBILE_DROPDOWN_LOGOUT_BUTTON = 'mobile-dropdown-logout-button',
  MOBILE_NAV_POSTS = 'mobile-nav-posts',
  MOBILE_NAV_FORUMS = 'mobile-nav-forums',
  MOBILE_NAV_ABOUT = 'mobile-nav-about',
  
  // Pages
  MAIN_PAGE = 'main-page',
  FORUMS_PAGE = 'forums-page',
  LOGIN_PAGE = 'login-page',
  SIGNUP_PAGE = 'signup-page',
  PROFILE_PAGE = 'profile-page',
  CREATE_POST_PAGE = 'create-post-page',
  ABOUT_PAGE = 'about-page',
  
  // Forms
  LOGIN_FORM = 'login-form',
  SIGNUP_FORM = 'signup-form',
  CREATE_POST_FORM = 'create-post-form',
  
  // Content
  POSTS_GRID = 'posts-grid',
  FORUMS_GRID = 'forums-grid',
  SEARCH_BAR = 'search-bar',
  LANGUAGE_TOGGLE = 'language-toggle',
  
  // Buttons
  LIKE_BUTTON = 'like-button',
  PROFILE_BUTTON = 'profile-button',
  DROPDOWN_PROFILE_LINK = 'dropdown-profile-link',
  USER_PROFILE_DROPDOWN_MENU = 'user-profile-dropdown-menu'
} 