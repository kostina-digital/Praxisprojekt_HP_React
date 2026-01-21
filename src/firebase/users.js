import { db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";

/**
 * Создает документ пользователя в Firestore с ID равным userId
 * @param {string} userId - UID пользователя из Firebase Auth
 * @param {string} email - Email пользователя
 * @param {string} name - Имя пользователя (опционально)
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