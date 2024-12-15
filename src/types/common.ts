export type Theme = 'light' | 'dark';

export type Locale = 'es' | 'en';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface MetaData {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url?: string;
}

export interface Route {
  path: string;
  name: string;
  component: React.ComponentType;
  exact?: boolean;
  private?: boolean;
}
