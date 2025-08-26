import { useState, useContext } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { AuthContext } from '../AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const { admin } = useContext(AuthContext)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, pass)
    } catch {
      alert('Login failed – check credentials')
    }
  }

  if (admin) return <p>Signed in as admin.</p>

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <div>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Admin email"
          required
        />
      </div>
      <div>
        <input
          type="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          placeholder="Password"
          required
        />
      </div>
      <button type="submit">Admin Login</button>
    </form>
  )
}