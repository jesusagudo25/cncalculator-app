import AppShell from './layouts/app-shell';
import NotFoundPage from './pages/404';
export const routes = [{ path: '/', element: <AppShell />, children: ['calculator', 'support', 'blog', 'premium'].map(path => ({ path, element: null })) }, { path: '*', element: <NotFoundPage /> }];
