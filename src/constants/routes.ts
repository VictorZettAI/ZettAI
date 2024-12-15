import { Route } from '../types/common';
import { lazy } from 'react';

// Lazy load components
const Home = lazy(() => import('../pages/Home'));
const Services = lazy(() => import('../pages/Services'));
const Team = lazy(() => import('../pages/Team'));
const Contact = lazy(() => import('../pages/Contact'));
const Blog = lazy(() => import('../pages/Blog'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const ROUTES: Route[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    exact: true,
  },
  {
    path: '/servicios',
    name: 'Servicios',
    component: Services,
  },
  {
    path: '/equipo',
    name: 'Equipo',
    component: Team,
  },
  {
    path: '/contacto',
    name: 'Contacto',
    component: Contact,
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
  },
  {
    path: '*',
    name: 'Not Found',
    component: NotFound,
  },
];
