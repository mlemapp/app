import { Navigate, Outlet } from 'react-router-dom';

import useAccount from '@/hooks/useAccount';

export default function DashboardLayout() {
    const { data: account } = useAccount();

    if (!account) {
        return <Navigate to="/onboarding" />;
    }

    return <Outlet />;
}
