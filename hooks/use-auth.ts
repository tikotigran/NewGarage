'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
  type User,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

interface UseAuthResult {
  user: User | null
  loading: boolean
  error: string | null
  register: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  verifyPassword: (password: string) => Promise<boolean>
}

export function useAuth(): UseAuthResult {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const register = useCallback(async (email: string, password: string) => {
    if (!auth) return
    setError(null)
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (e: any) {
      setError(e?.message || 'Ошибка регистрации')
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    if (!auth) return
    setError(null)
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e: any) {
      setError(e?.message || 'Ошибка входа')
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    if (!auth) return
    setError(null)
    setLoading(true)
    try {
      await signOut(auth)
    } catch (e: any) {
      setError(e?.message || 'Ошибка выхода')
    } finally {
      setLoading(false)
    }
  }, [])

  const verifyPassword = useCallback(async (password: string): Promise<boolean> => {
    if (!user || !user.email) return false
    try {
      const credential = EmailAuthProvider.credential(user.email, password)
      await reauthenticateWithCredential(user, credential)
      return true
    } catch {
      return false
    }
  }, [user])

  return { user, loading, error, register, login, logout, verifyPassword }
}

