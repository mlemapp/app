import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import backend from 'i18next-http-backend';

import Spinner from './components/ui/Spinner';
import routes from './routes';

const queryClient = new QueryClient();

i18n.use(initReactI18next)
    .use(backend)
    .init({
        lng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

const router = createBrowserRouter(routes);

export function App() {
    return (
        <div className="flex w-dvw h-dvh px-4">
            <QueryClientProvider client={queryClient}>
                <React.Suspense fallback={<Spinner centered />}>
                    <RouterProvider router={router} />
                </React.Suspense>
            </QueryClientProvider>
        </div>
    );
}
