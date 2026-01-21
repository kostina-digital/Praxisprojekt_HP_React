import { db } from "../../config/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

/**
 * Сохраняет результат квиза для пользователя
 * @param {string} userId - ID пользователя (UID из Firebase Auth)
 * @param {string} houseName - Название дома (courage, wisdom, loyalty, ambition)
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
    
    // Сохраняем результат в документ пользователя с ID = userId
    // Используем setDoc с merge: true, чтобы не перезаписать другие данные пользователя
    // Это создаст документ с ID = userId, если его еще нет
    const userRef = doc(db, "users", userId);
    console.log(`Document reference created: users/${userId}`);
    
    // Проверяем, существует ли документ
    const userSnap = await getDoc(userRef);
    console.log(`Document exists: ${userSnap.exists()}`);
    
    if (userSnap.exists()) {
      // Если документ существует, обновляем только нужные поля
      await updateDoc(userRef, {
        quizResult: houseName,
        quizCompletedAt: new Date(),
      });
      console.log(`✅ Quiz result updated in existing document: users/${userId}`);
    } else {
      // Если документа нет, создаем новый с userId как ID
      await setDoc(userRef, {
        email: "", // Будет заполнено при следующем обновлении профиля
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
 * Получает результат квиза для пользователя
 * @param {string} userId - ID пользователя (UID из Firebase Auth)
 * @returns {Promise<string|null>} - Название дома или null, если результат не найден
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

