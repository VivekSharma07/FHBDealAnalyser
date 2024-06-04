// lib/data.js
// import admin from 'firebase-admin';
import path from "path";
import { doc, getDoc} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase/firebaseConfig";


export async function fetchDealAnalyzerData(docId) {
  try {
    const dealAnalyzerRef = doc(db, "deal-analyser", docId);
    const dealAnalyzerSnap = await getDoc(dealAnalyzerRef);

    if (dealAnalyzerSnap.exists()) {
      return dealAnalyzerSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching deal analyzer:", error);
    throw new Error("Failed to fetch deal analyzer data");
  }
}



const functions = getFunctions(app);

const updateOrCreateDeal = httpsCallable(functions, "updateOrCreateDeal"); // Update with your function name

export async function handleSave(initialData, setSaving, docId) {
  setSaving(true);
console.log(`under handlesave function`)
  try {
    const result = await updateOrCreateDeal({
      docId: docId, // Pass the document ID (or null if creating a new one)
      dealData: initialData, // Pass the data to save
    });

    console.log(result.data); // Handle success message from Firebase Function
    // Optionally, navigate to the newly created document if needed
    if (!docId) {
        throw new Error('No Document ID Provided')
    }
  } catch (error) {
    console.error("Error updating or creating deal:", error);
    // Handle errors (e.g., show error messages to the user)
  } finally {
    setSaving(false);
  }
}


// export async function handleSave(initialData, setSaving) {
//     setSaving(true);

//     try {
//       if (initialData?.id) {
//         // Update existing document
//         await firestore
//           .collection("deal-analyser")
//           .doc(initialData.id)
//           .set(formData);

//           console.log(`saved/updated`)

//           return;

//       } else {
//         // Create new document
//         const newDealAnalyzerRef = await firestore
//           .collection("deal-analyser")
//           .add(formData);

//         console.log(`created new doc = `, newDealAnalyzerRef)

//         return;
//       }
//     } catch (error) {
//       console.error("Error saving deal analyzer:", error);
//       return;

//     } finally {
//       setSaving(false);
//       return;
//     }
//   }
