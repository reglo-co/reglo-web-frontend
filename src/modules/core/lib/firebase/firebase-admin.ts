import { App, cert, getApps, initializeApp } from 'firebase-admin/app'
import { Firestore, getFirestore } from 'firebase-admin/firestore'
import { env } from '@env'

let firebaseAdminApp: App | null = null
let _adminDb: Firestore | null = null

function initializeFirebaseAdmin(): Firestore {
  if (!_adminDb) {
    if (!getApps().length) {
      // Verificar se todas as variáveis de ambiente necessárias estão definidas
      const projectId = env.FIREBASE_PROJECT_ID
      const clientEmail = env.FIREBASE_CLIENT_EMAIL
      const privateKey = env.FIREBASE_PRIVATE_KEY

      console.table([
        {
          projectId: projectId ? '✅ Set' : '❌ Missing',
          clientEmail: clientEmail ? '✅ Set' : '❌ Missing',
          privateKey: privateKey ? '✅ Set' : '❌ Missing',
        },
      ])

      firebaseAdminApp = initializeApp({
        credential: cert({
          projectId: projectId,
          clientEmail: clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      })
    } else {
      firebaseAdminApp = getApps()[0]
    }
    _adminDb = getFirestore(firebaseAdminApp)
  }
  return _adminDb
}

export function getFirebaseAdminDb(): Firestore {
  return initializeFirebaseAdmin()
}
