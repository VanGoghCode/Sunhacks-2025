// Simple authentication utilities
export interface User {
  email: string;
  name: string;
  organization: string;
  dashboardRoute: string;
}

// Mock authentication - in a real app, this would be handled by a proper auth system
export const authenticateUser = (email: string): User | null => {
  if (email.endsWith('@loopit.org') || email.endsWith('@loopit.com')) {
    return {
      email,
      name: email.split('@')[0],
      organization: 'LoopIT',
      dashboardRoute: '/dashboard'
    };
  }
  
  if (email.endsWith('@amazon.com')) {
    return {
      email,
      name: email.split('@')[0],
      organization: 'Amazon',
      dashboardRoute: '/amazon/dashboard'
    };
  }
  
  // Any other email goes to marketplace
  return {
    email,
    name: email.split('@')[0],
    organization: 'Individual',
    dashboardRoute: '/marketplace'
  };
};

// Session management (in a real app, use proper session management)
export const setUserSession = (user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const getUserSession = (): User | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

export const clearUserSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

export const isAuthorizedForRoute = (route: string): boolean => {
  const user = getUserSession();
  if (!user) return false;
  
  // Check if user is authorized for the specific route
  if (route.startsWith('/dashboard') && user.organization === 'LoopIT') {
    return true;
  }
  
  if (route.startsWith('/amazon/dashboard') && user.organization === 'Amazon') {
    return true;
  }
  
  if (route.startsWith('/marketplace') && user.organization === 'Individual') {
    return true;
  }
  
  return false;
};