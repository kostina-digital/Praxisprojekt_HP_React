import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function createUser(email, password, name) {
    const usersCollection = collection(db, "users");
    await addDoc(usersCollection, {
        email: email,
        name: name || "",
        createdAt: new Date(),
        // Note: passwords are not stored in Firestore - they are managed by Firebase Auth
    });
}