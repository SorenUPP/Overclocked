import 'server-only';
import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Server-side Firebase access for API routes and server actions.
 * Requires FIREBASE_SERVICE_ACCOUNT_KEY (single-line service account JSON).
 */
function getAdminApp() {
  if (getApps().length) return getApp();

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set.');
  }

  return initializeApp({ credential: cert(JSON.parse(raw)) });
}

export const adminDb = () => getFirestore(getAdminApp());
