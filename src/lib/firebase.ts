import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Using hardcoded fallbacks here since Firebase client keys are completely public by design.
// This guarantees the app works even if Vercel Environment Variables aren't set perfectly.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBsa-gTKnFyuxKlLiR8XAyxp1o9Vwlw1Q4',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'veyra-website-4a3af.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'veyra-website-4a3af',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'veyra-website-4a3af.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '767381758564',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:767381758564:web:c4077d09aefaca7038f571',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { app, auth };
