// lib/data.js
import admin from 'firebase-admin';
import path from 'path'
// If you're using a service account key file:
const serviceAccount = require('./fhb-deal-analyser-firebase-adminsdk-85699-6ca3fa1818.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

export async function fetchDealAnalyzerData(docId) {
    try {
        const docRef = firestore.collection("deal-analyser").doc(docId);
        const docSnapshot = await docRef.get();

        if (docSnapshot.exists) {
            return docSnapshot.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching deal analyzer:", error);
        throw new Error("Failed to fetch deal analyzer data");
    }
}
