import { KindeProvider, useKindeAuth } from '@kinde-oss/kinde-auth-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/dashboard/HomePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
]);

export function App() {
    return (
        <KindeProvider
            clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
            domain={import.meta.env.VITE_KINDE_DOMAIN}
            logoutUri={import.meta.env.VITE_KINDE_LOGOUT_URL}
            redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URL}
        >
            <InnerApp />
        </KindeProvider>
    );
}

function InnerApp() {
    const { isLoading, isAuthenticated, login } = useKindeAuth();

    if (isLoading) {
        return 'Loading...';
    }

    if (!isAuthenticated) {
        login();
        return null;
    }

    return <RouterProvider router={router} />;
}
