import userAvatar from '../../assets/images/user.png'
import { useState, useEffect } from 'react';
import { auth } from '../../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProfilePage() {
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        // Track authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUserEmail(user.email.split('@')[0].trim());
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap">
            <h1>
                Hello, {userEmail || "guest"}!
            </h1>
            <img src={userAvatar} alt="User Avatar" className="w-auto h-auto rounded-full my-4" />
            <p>This is your profile page. Here you can manage your account and preferences.</p>
        </div>
    )
}