'use client'

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAjDFgQf7abQvrTw8SE8tKIhQ2_3NMmMKk",
  authDomain: "newedvi.firebaseapp.com",
  projectId: "newedvi",
  storageBucket: "newedvi.firebasestorage.app",
  messagingSenderId: "109374849969",
  appId: "1:109374849969:web:b2072f0746c9ca9fa17390",
}

let app: FirebaseApp | undefined
let auth: Auth | undefined
let db: Firestore | undefined

if (typeof window !== 'undefined') {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
  auth = getAuth(app)
  db = getFirestore(app)
}

export { auth, db }
