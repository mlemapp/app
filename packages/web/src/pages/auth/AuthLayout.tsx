import { Navigate, Outlet, useSearchParams } from 'react-router-dom';

import Spinner from '@/components/ui/Spinner';
import useIdentity from '@/hooks/useIdentity';

export default function AuthLayout() {
    const [params] = useSearchParams();
    const { status } = useIdentity();

    if (status === 'pending') {
        return <Spinner centered />;
    }

    if (status === 'authenticated') {
        return <Navigate to={params.get('continue') || '/'} />;
    }

    return <Outlet />;
}
