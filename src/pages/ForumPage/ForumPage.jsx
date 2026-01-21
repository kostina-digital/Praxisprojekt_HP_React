import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, realtimeDb } from '../../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue, off } from 'firebase/database';
import TopicPreviewCard from './TopicPreviewCard.jsx';
import CTAButton from '../../components/common/CTAButton.jsx';

export default function ForumPage() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Track authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch topics from Realtime Database
    const topicsRef = ref(realtimeDb, 'forum/topics');
    
    const unsubscribe = onValue(topicsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object to array and sort by createdAt (newest first)
        const topicsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
          // Calculate lastReply from replies if not set
          lastReply: data[key].lastReply || null
        })).sort((a, b) => {
          const timeA = a.createdAt || 0;
          const timeB = b.createdAt || 0;
          return timeB - timeA; // Newest first
        });
        setTopics(topicsArray);
      } else {
        setTopics([]);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error loading topics:', error);
      setLoading(false);
    });

    return () => {
      off(topicsRef);
    };
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading forum...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Forum</h1>
          <p className="text-gray-600">
            Here you can find the latest news and updates about the Harry Potter universe.
          </p>
        </div>
        {currentUser && (
          <CTAButton href="/forum/create-topic" text="+ Create Topic" />
        )}
      </div>

      {!currentUser && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-blue-800">
            Please <button onClick={() => navigate('/sign-in')} className="underline font-semibold">sign in</button> to create new topics and reply to discussions.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {topics.length > 0 ? (
          topics.map((topic) => (
            <TopicPreviewCard key={topic.id} topic={topic} />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No topics yet. Be the first to create one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
