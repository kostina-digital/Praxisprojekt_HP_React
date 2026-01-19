import userAvatar from '../../assets/images/user.png'
import { useState, useEffect } from 'react';
import { auth } from '../../../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ForumSection from '../ForumPage/ForumSection.jsx';
import CategoryCardProfileMenu from './CategoryCardProfileMenu.jsx';
import { categorysProfilePage } from './CategorysProfilePage.js';

export default function ProfilePage() {
    const [userEmail, setUserEmail] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Track authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUserEmail(user.displayName || user.email?.split('@')[0] || 'User');
            } else {
                // User is signed out, redirect to home
                navigate('/');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    return (
        <>
        <div className="flex justify-between gap-4">
        <div className="flex flex-col items-center justify-between w-1/3">
            <h1>
                Hello, {userEmail || "guest"}!
            </h1>
            <img src={userAvatar} alt="User Avatar" className="w-auto h-auto rounded-full my-4" />
            <p>This is your profile page. Here you can manage your account and preferences.</p>
            <button 
                onClick={async () => {
                    try {
                        await signOut(auth);
                        console.log('User signed out successfully');
                    } catch (error) {
                        console.error('Error signing out:', error);
                        alert('Error signing out. Please try again.');
                    }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
                Sign Out
            </button>
        </div>
        <div className="w-2/3">
            <ForumSection />
            <div className="flex flex-wrap mt-6">
                {categorysProfilePage.map((category) => (
                    <CategoryCardProfileMenu key={category.id} data={category} />
                ))}
            </div>
        </div>
        </div>
        
        
        </>
        
    )
}