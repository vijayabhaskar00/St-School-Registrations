import { useState } from 'react'
import Register from './Register'
import Login from './Login'

export default function AuthCard() {
  const [mode, setMode] = useState('register')
  return (
    <div className="auth-card">
      <div className="tab-toggle">
        <button
          type="button"
          className={mode === 'register' ? 'active' : ''}
          onClick={() => setMode('register')}
        >
          Register
        </button>
        <button
          type="button"
          className={mode === 'login' ? 'active' : ''}
          onClick={() => setMode('login')}
        >
          Sign In
        </button>
      </div>
      {mode === 'register'
        ? <Register onRegistered={() => setMode('login')} />
        : <Login />
      }
    </div>
  )
}