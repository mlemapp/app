import { RouteObject } from "react-router-dom"

import AppLayout from './pages/AppLayout';
import AuthLayout from './pages/auth/AuthLayout';
import SigninPage from './pages/auth/SigninPage';
import HomePage from './pages/dashboard/HomePage';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import OnboardingPage from './pages/onboarding/OnboardingPage';

export default [
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'signin',
                element: <SigninPage />,
            },
        ],
    },
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    {
                        path: '',
                        element: <HomePage />,
                    },
                ],
            },
            {
                path: 'onboarding',
                element: <OnboardingPage />,
            },
        ],
    },
] satisfies RouteObject[];
