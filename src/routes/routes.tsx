import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import SignupForm from '@/pages/Signup';
import { routeGenerator } from '@/utils/routesGenerator';
import { adminPaths } from './admin.routes';
import { dataEntryPaths } from './dataEntry.routes';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(dataEntryPaths),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignupForm />,
  },
]);

export default router;