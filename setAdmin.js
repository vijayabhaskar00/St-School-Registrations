import admin from 'firebase-admin'
import { readFileSync } from 'fs'

let serviceAccount
if (process.env.SERVICE_ACCOUNT_KEY) {
  // Load from environment variable (e.g. in Vercel)
  serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY)
} else {
  // Fallback to local file for development
  serviceAccount = JSON.parse(readFileSync('./serviceAccountKey.json', 'utf8'))
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const uid = process.argv[2]
if (!uid) {
  console.error('Usage: node setAdmin.js <USER_UID>')
  process.exit(1)
}

try {
  await admin.auth().setCustomUserClaims(uid, { admin: true })
  console.log(`✅ admin claim set on UID=${uid}`)
  process.exit(0)
} catch (err) {
  console.error('❌ error setting custom claim:', err)
  process.exit(1)
}