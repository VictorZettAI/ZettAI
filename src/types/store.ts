import { ApiError } from './api';

export interface RootState {
  auth: AuthState;
  ui: UIState;
  app: AppState;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserState | null;
  loading: boolean;
  error: ApiError | null;
}

export interface UserState {
  id: string;
  email: string;
  name: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

export interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  modal: {
    isOpen: boolean;
    type: string | null;
    data: any;
  };
  toast: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  };
}

export interface AppState {
  initialized: boolean;
  version: string;
  maintenance: boolean;
  features: {
    [key: string]: boolean;
  };
}
