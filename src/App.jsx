import './App.css'
import { useContext } from 'react'
import { AuthProvider, AuthContext } from './AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from './firebaseConfig'
import ExportCSV from './components/ExportCSV'
import AuthCard from './components/AuthCard'

function InnerApp() {
  const { user, admin, loading } = useContext(AuthContext)
  if (loading) return <p>Loading authentication...</p>
  return (
    <div id="export-page">
      <h1>St-School Registration Data</h1>
      {!user && <AuthCard />}
      {user && !admin && (
        <>
          <p>You don't have access to data.</p>
          <div className="nonadmin-actions">
            <button onClick={() => signOut(auth)}>Sign Out</button>
          </div>
        </>
      )}
      {admin && (
        <>
          <h1>Download CSV</h1>
          <div className="admin-actions">
            <ExportCSV />
            <button onClick={() => signOut(auth)}>Sign Out</button>
          </div>
        </>
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  )
}
