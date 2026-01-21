import { db } from "../../config/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

/**
 * Saves quiz result for a user
 * @param {string} userId - User ID (UID from Firebase Auth)
 * @param {string} houseName - House name (courage, wisdom, loyalty, ambition)
 * @returns {Promise<void>}
 */
export async function saveQuizResult(userId, houseName) {
  try {
    if (!userId) {
      throw new Error("User ID is required to save quiz result");
    }
    
    if (!houseName) {
      throw new Error("House name is required to save quiz result");
    }
    
    console.log(`Attempting to save quiz result - userId: ${userId}, houseName: ${houseName}`);
    
    // Save result to user document with ID = userId
    // Use setDoc with merge: true to avoid overwriting other user data
    // This will create a document with ID = userId if it doesn't exist yet
    const userRef = doc(db, "users", userId);
    console.log(`Document reference created: users/${userId}`);
    
    // Check if document exists
    const userSnap = await getDoc(userRef);
    console.log(`Document exists: ${userSnap.exists()}`);
    
    if (userSnap.exists()) {
      // If document exists, update only the necessary fields
      await updateDoc(userRef, {
        quizResult: houseName,
        quizCompletedAt: new Date(),
      });
      console.log(`✅ Quiz result updated in existing document: users/${userId}`);
    } else {
      // If document doesn't exist, create a new one with userId as ID
      await setDoc(userRef, {
        email: "", // Will be filled on next profile update
        quizResult: houseName,
        quizCompletedAt: new Date(),
      });
      console.log(`✅ New document created with quiz result: users/${userId}`);
    }
    
    console.log(`✅ Quiz result saved successfully - userId: ${userId}, house: ${houseName}`);
  } catch (error) {
    console.error("❌ Error saving quiz result:", error);
    console.error("Error details:", {
      userId,
      houseName,
      errorMessage: error.message,
      errorCode: error.code
    });
    throw error;
  }
}

/**
 * Gets quiz result for a user
 * @param {string} userId - User ID (UID from Firebase Auth)
 * @returns {Promise<string|null>} - House name or null if result not found
 */
export async function getQuizResult(userId) {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data().quizResult || null;
    }
    return null;
  } catch (error) {
    console.error("Error getting quiz result:", error);
    throw error;
  }
}

