import { Navigate, Outlet } from 'react-router-dom';

import Spinner from '@/components/ui/Spinner';
import useIdentity from '@/hooks/useIdentity';

export default function AppLayout() {
    const { status } = useIdentity();

    if (status === 'pending') {
        return <Spinner centered />;
    }

    if (status === 'unauthenticated') {
        const redirectPath = encodeURIComponent(window.location.pathname + window.location.search);
        return <Navigate to={`/auth/signin?continue=${redirectPath}`} />;
    }

    return <Outlet />;
}
