import { createContext, useState, useEffect } from 'react'
import { auth } from './firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext({ user: null, admin: false, loading: true })

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async u => {
      if (u) {
        setUser(u)
        // force refresh so new claims are included
        const { claims } = await u.getIdTokenResult(true)
        setAdmin(!!claims.admin)
      } else {
        setUser(null)
        setAdmin(false)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user, admin, loading }}>
      {children}
    </AuthContext.Provider>
  )
}