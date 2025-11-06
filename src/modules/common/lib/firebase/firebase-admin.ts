import { App, cert, getApps, initializeApp } from 'firebase-admin/app'
import { Firestore, getFirestore } from 'firebase-admin/firestore'

let firebaseAdminApp: App | null = null
let _adminDb: Firestore | null = null

function initializeFirebaseAdmin(): Firestore {
  if (!_adminDb) {
    if (!getApps().length) {
      // Verificar se todas as variáveis de ambiente necessárias estão definidas
      const projectId = process.env.FIREBASE_PROJECT_ID
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
      const privateKey = process.env.FIREBASE_PRIVATE_KEY

      console.table([
        {
          projectId: projectId ? '✅ Set' : '❌ Missing',
          clientEmail: clientEmail ? '✅ Set' : '❌ Missing',
          privateKey: privateKey ? '✅ Set' : '❌ Missing',
        },
      ])

      if (!projectId || !clientEmail || !privateKey) {
        throw new Error(
          'Firebase Admin SDK: Variáveis de ambiente não configuradas. ' +
            'Certifique-se de que FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL e FIREBASE_PRIVATE_KEY estão definidas. ' +
            `Atual: projectId=${!!projectId}, clientEmail=${!!clientEmail}, privateKey=${!!privateKey}`
        )
      }

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
