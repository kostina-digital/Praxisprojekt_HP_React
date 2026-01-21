import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, realtimeDb } from '../../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, push, set } from 'firebase/database';

export default function CreateTopic() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Track authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (!user) {
        navigate('/sign-in');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    if (!currentUser) {
      alert('Please sign in to create a topic');
      return;
    }

    // Save topic to Realtime Database
    try {
      const topicsRef = ref(realtimeDb, 'forum/topics');
      const newTopicRef = push(topicsRef);
      
      const topicData = {
        title: title.trim(),
        content: content.trim(),
        author: currentUser.email?.split('@')[0] || currentUser.displayName || 'User',
        authorEmail: currentUser.email,
        createdAt: Date.now(),
        views: 0,
        repliesCount: 0
      };

      await set(newTopicRef, topicData);
      
      alert('Topic created successfully!');
      navigate('/forum');
    } catch (error) {
      console.error('Error creating topic:', error);
      alert('Error creating topic. Please try again.');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button 
        onClick={() => navigate('/forum')}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Forum
      </button>

      <div className="bg-white border rounded shadow-md p-6">
        <h1 className="h1_style mb-6">Create New Topic</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Topic Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter topic title..."
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              maxLength={200}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your topic content..."
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={10}
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Topic
            </button>
            <button
              type="button"
              onClick={() => navigate('/forum')}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

