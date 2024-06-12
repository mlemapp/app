import React from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/firebase';

export default function useIdentity() {
    const [status, setStatus] = React.useState<'authenticated' | 'unauthenticated' | 'pending'>('pending');
    const [identity, setIdentity] = React.useState<User | null>(null);

    React.useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (user) => {
            setStatus(user ? 'authenticated' : 'unauthenticated');
            setIdentity(user);
        });

        return unsubcribe;
    }, []);

    return { status, identity };
}
