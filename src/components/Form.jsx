import { useState } from 'react'
import { db } from '../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

export default function Form() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    course: '',
    graduationYear: '',
    date: '',
    time: ''
  })

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'responses'), form)
      alert('Submitted!')
      setForm({
        name: '', email: '', mobile: '', course: '',
        graduationYear: '', date: '', time: ''
      })
    } catch {
      alert('Submission failed.')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      {Object.keys(form).map(key => (
        <div key={key} style={{ margin: '0.5rem 0' }}>
          <label style={{ marginRight: '0.5rem' }}>{key}:</label>
          <input
            name={key}
            value={form[key]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button type="submit">Register</button>
    </form>
  )
}