import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const app = initializeApp({
    apiKey: 'AIzaSyCvwVPkaJS9VkM0iVvrijtj1tsuGFJLOm0',
    authDomain: 'mlem-7547b.firebaseapp.com',
    projectId: 'mlem-7547b',
    storageBucket: 'mlem-7547b.appspot.com',
    messagingSenderId: '612363112047',
    appId: '1:612363112047:web:564177c056251c1875c79a',
    measurementId: 'G-D38XQG1VKS',
});

export const auth = getAuth(app);
export const db = getFirestore(app, 'development');
