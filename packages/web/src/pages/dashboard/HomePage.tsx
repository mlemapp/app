import { signOut } from 'firebase/auth';

import { auth } from '@/firebase';

export default function HomePage() {
    function onClick() {
        signOut(auth);
    }

    return (
        <div>
            Home page
            <button onClick={onClick}>Sign out</button>
        </div>
    );
}
