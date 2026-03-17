import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAjDFgQf7abQvrTw8SE8tKIhQ2_3NMmMKk",
  authDomain: "newedvi.firebaseapp.com",
  projectId: "newedvi",
  storageBucket: "newedvi.firebasestorage.app",
  messagingSenderId: "109374849969",
  appId: "1:109374849969:web:b2072f0746c9ca9fa17390",
}

console.log("[v0] Firebase config apiKey:", firebaseConfig.apiKey)
console.log("[v0] Firebase config projectId:", firebaseConfig.projectId)

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)

