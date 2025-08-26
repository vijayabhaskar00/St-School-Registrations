import { useState } from 'react'
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebaseConfig'

export default function Register({ onRegistered }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async e => {
    e.preventDefault()
    setError('')
    try {
      await createUserWithEmailAndPassword(auth, email, pass)
      // after signup, switch to login tab and sign out the new user
      onRegistered && onRegistered()
      await signOut(auth)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        {error && <p className="error-text">{error}</p>}
      </form>
    </>
  )
}