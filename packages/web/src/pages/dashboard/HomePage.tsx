import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

export default function HomePage() {
    const { user } = useKindeAuth();

    return <div>Home page: {user!.email}</div>;
}
