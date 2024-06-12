import { useSuspenseQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '@/firebase';

import useIdentity from './useIdentity';

export default function useAccount() {
    const { identity } = useIdentity();
    const account = useSuspenseQuery({
        queryKey: ['account', identity],
        queryFn: async () => {
            if (!identity) {
                return null;
            }

            const docRef = doc(db, 'accounts', identity.uid);
            const docSnap = await getDoc(docRef);
            console.log({ docSnap: docSnap.data() });

            return docSnap.data() || null;
        },
    });

    return account;
}
