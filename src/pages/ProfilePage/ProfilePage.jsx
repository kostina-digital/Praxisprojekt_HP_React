import userAvatar from '../../assets/images/user.png'
import { useState, useEffect } from 'react';
import { auth } from '../../../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ForumSection from '../ForumPage/ForumSection.jsx';
import CategoryCardProfileMenu from './CategoryCardProfileMenu.jsx';
import { categorysProfilePage } from './CategorysProfilePage.js';
import CTAButton from '../../components/common/CTAButton.jsx';
import QuizResultsSection from '../../components/common/QuizResultsSection.jsx';
import { getQuizResult } from '../../firebase/quiz.js';
import housesData from '../Houses/HousesData.js';
import HousePageHero from '../Houses/HousePage/HousePageHero.jsx';

// Mapping from quizResult (courage, wisdom, loyalty, ambition) to house name
const quizResultToHouseName = {
  courage: 'Gryffindor',
  wisdom: 'Ravenclaw',
  loyalty: 'Hufflepuff',
  ambition: 'Slytherin'
};

export default function ProfilePage() {
    const [userEmail, setUserEmail] = useState(null);
    const [quizResult, setQuizResult] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Track authentication state changes
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in
                setUserEmail(user.displayName || user.email?.split('@')[0] || 'User');
                
                // Get quiz result from Firebase
                try {
                    const houseName = await getQuizResult(user.uid);
                    if (houseName) {
                        setQuizResult(houseName);
                    }
                } catch (error) {
                    console.error('Error getting quiz result:', error);
                }
            } else {
                // User is signed out, redirect to home
                navigate('/');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    return (
        <>
        <div className="flex justify-between gap-4 my-8 flex-col">
            {quizResult && (() => {
                const houseName = quizResultToHouseName[quizResult];
                const house = housesData.find(h => h.name === houseName);
                return house ? <HousePageHero house={house} /> : null;
            })()}
            <div className="flex justify-between gap-4 my-8">
        <div className="flex flex-col items-center justify-between w-1/3 mr-6">
            <h1 className="h1_style">
                Hello, {userEmail || "guest"}!
            </h1>
            <img src={userAvatar} alt="User Avatar" className="w-auto h-auto rounded-full my-4" />
            <p>This is your profile page. Here you can manage your account and preferences.</p>
            <CTAButton
                href="#"
                text="Sign Out"
                onClick={async (e) => {
                    e.preventDefault();
                    try {
                        await signOut(auth);
                        console.log('User signed out successfully');
                    } catch (error) {
                        console.error('Error signing out:', error);
                        alert('Error signing out. Please try again.');
                    }
                }}
            />
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
        </div>
        
        
        </>
        
    )
}