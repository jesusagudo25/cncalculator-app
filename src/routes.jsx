import { Outlet } from 'react-router-dom';
import { Layout as DashboardLayout } from './layouts/dashboard/layout';
import PremiumPage from './pages/premium';
import NotFoundPage from './pages/404';
import CalculatorPage from './pages/calculator';
import HomePage from './pages';
import SupportPage from './pages/support';


export const routes = [
  {
    element: (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'calculator',
        element: <CalculatorPage />
      },
      {
        path: 'support',
        element: <SupportPage />
      },
      {
        path: 'premium',
        element: <PremiumPage />
      }
    ]
  },
  {
    path: '404',
    element: <NotFoundPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];
