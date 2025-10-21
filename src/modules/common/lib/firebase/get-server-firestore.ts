import { firebaseInitializeApp } from '@common/lib/firebase'
import { getFirestore } from 'firebase-admin/firestore'

firebaseInitializeApp()

export const getServerFirestore = getFirestore
