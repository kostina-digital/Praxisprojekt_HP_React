import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import TopicPreviewCard from './TopicPreviewCard.jsx';

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
    // In real app, fetch topics from Firestore
    // For now, using mock data
    const mockTopics = [
      {
        id: '1',
        title: 'Who is your favorite character?',
        content: "Let's discuss which character is the most relatable to you and why!",
        author: 'HermioneG',
        createdAt: { seconds: Date.now() / 1000 - 86400 },
        repliesCount: 5,
        views: 42,
        lastReply: { seconds: Date.now() / 1000 - 3600 }
      },
      {
        id: '2',
        title: 'Best Harry Potter book?',
        content: 'Which book in the series do you think is the best and why?',
        author: 'BookLover',
        createdAt: { seconds: Date.now() / 1000 - 172800 },
        repliesCount: 12,
        views: 89,
        lastReply: { seconds: Date.now() / 1000 - 7200 }
      },
      {
        id: '3',
        title: 'Hogwarts House Discussion',
        content: 'What house do you belong to and why? Share your sorting experience!',
        author: 'GryffindorPride',
        createdAt: { seconds: Date.now() / 1000 - 259200 },
        repliesCount: 23,
        views: 156,
        lastReply: { seconds: Date.now() / 1000 - 1800 }
      }
    ];

    setTopics(mockTopics);
    setLoading(false);
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
          <button
            onClick={() => navigate('/forum/create-topic')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Create Topic
          </button>
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
