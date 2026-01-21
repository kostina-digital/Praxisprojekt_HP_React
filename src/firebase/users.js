import { db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";

/**
 * Creates a user document in Firestore with ID equal to userId
 * @param {string} userId - User UID from Firebase Auth
 * @param {string} email - User email
 * @param {string} name - User name (optional)
 */
export async function createUser(userId, email, name) {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, {
        email: email,
        name: name || "",
        createdAt: new Date(),
        // Note: passwords are not stored in Firestore - they are managed by Firebase Auth
    }, { merge: true });
}