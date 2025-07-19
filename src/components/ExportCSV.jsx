import React from 'react'
import { db } from '../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

const ExportCSV = () => {
  const handleExport = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'responses'))
      const data = []
      querySnapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() })
      })

      if (data.length === 0) {
        alert('No data available to export.')
        return
      }

      // Build CSV
      const headers = Object.keys(data[0])
      const csvRows = [headers.join(',')]

      data.forEach(row => {
        const values = headers.map(header => {
          const val = row[header] != null ? row[header] : ''
          return `"${('' + val).replace(/"/g, '""')}"`
        })
        csvRows.push(values.join(','))
      })

      const csvString = csvRows.join('\n')
      const blob = new Blob([csvString], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.hidden = true
      a.href = url
      a.download = 'responses.csv'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error fetching documents: ', error)
      alert('Export failed')
    }
  }

  return <button onClick={handleExport}>Export CSV</button>
}

export default ExportCSV