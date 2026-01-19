import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopicCard from './TopicCard.jsx';
import ReplyCard from './ReplyCard.jsx';
import { auth } from '../../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function TopicPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState(null); // Track which reply we're replying to
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
    // In real app, fetch topic and replies from Firestore
    // For now, using mock data
    const loadTopicData = () => {
      const mockTopic = {
        id: topicId,
        title: 'Who is your favorite character?',
        content: "Let's discuss which character is the most relatable to you and why! I personally love Hermione because of her intelligence and determination.",
        author: 'HermioneG',
        createdAt: { seconds: Date.now() / 1000 - 86400 },
        views: 42,
        likes: 15,
        dislikes: 2,
        repliesCount: 2
      };

      const mockReplies = [
        {
          id: '1',
          author: 'HarryP',
          content: 'I agree! Hermione is definitely one of the best characters. Her loyalty and bravery are unmatched.',
          createdAt: { seconds: Date.now() / 1000 - 3600 }
        },
        {
          id: '2',
          author: 'RonW',
          content: 'For me, it\'s Ron. He shows that you can be brave even when you\'re scared, and his humor makes everything better.',
          createdAt: { seconds: Date.now() / 1000 - 7200 }
        }
      ];

      setTopic(mockTopic);
      setReplies(mockReplies);
      setLoading(false);
    };

    loadTopicData();
  }, [topicId]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert('Please sign in to reply');
      navigate('/sign-in');
      return;
    }

    const trimmedContent = replyContent.trim();
    if (!trimmedContent) {
      alert('Please enter a reply');
      return;
    }

    try {
      // In real app, save reply to Firestore
      // await addDoc(collection(db, 'topics', topicId, 'replies'), {
      //   content: trimmedContent,
      //   author: currentUser.email?.split('@')[0] || 'User',
      //   authorEmail: currentUser.email,
      //   createdAt: serverTimestamp(),
      //   topicId: topicId
      // });

      const newReply = {
        id: `reply-${Date.now()}`,
        author: currentUser.email?.split('@')[0] || currentUser.displayName || 'User',
        content: trimmedContent,
        createdAt: { seconds: Math.floor(Date.now() / 1000) },
        replyingTo: replyingTo?.id || null, // Store parent reply ID if replying to a comment
        replyingToAuthor: replyingTo?.author || null // Store parent author for display
      };

      console.log('Adding new reply:', newReply);

      // Update replies state using functional update
      setReplies(prevReplies => {
        const updated = [...prevReplies, newReply];
        console.log('Updated replies:', updated);
        return updated;
      });
      
      // Clear form and replyingTo
      setReplyContent('');
      setReplyingTo(null);
      
      // Update topic replies count
      if (topic) {
        setTopic(prevTopic => ({
          ...prevTopic,
          repliesCount: (prevTopic.repliesCount || 0) + 1
        }));
      }
    } catch (error) {
      console.error('Error posting reply:', error);
      alert('Error posting reply. Please try again.');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading topic...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button 
        onClick={() => navigate('/forum')}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Forum
      </button>
      
      <TopicCard topic={topic} />
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">
          Replies ({replies.length})
        </h2>
        
        {replies.length > 0 ? (
          <div>
            {replies.map((reply) => (
              <ReplyCard 
                key={reply.id} 
                reply={reply} 
                onReplyClick={() => {
                  if (currentUser) {
                    setReplyingTo(reply);
                    // Scroll to reply form
                    document.getElementById('reply-form')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  } else {
                    navigate('/sign-in');
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No replies yet. Be the first to reply!</p>
        )}

        {currentUser ? (
          <form id="reply-form" onSubmit={handleReplySubmit} className="mt-6 bg-gray-50 p-4 rounded">
            {replyingTo && (
              <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Replying to:</span>
                  <span className="font-semibold text-blue-700">{replyingTo.author}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ✕ Cancel
                </button>
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="reply-content" className="block text-sm font-medium text-gray-700 mb-2">
                {replyingTo ? `Reply to ${replyingTo.author}` : 'Your Reply'}
              </label>
              <textarea
                id="reply-content"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder={replyingTo ? `Write a reply to ${replyingTo.author}...` : "Write your reply..."}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={!replyContent.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {replyingTo ? 'Post Reply' : 'Post Reply'}
              </button>
              {replyingTo && (
                <button
                  type="button"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyContent('');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <p className="text-gray-600 mb-2">Please sign in to reply to this topic.</p>
            <button
              onClick={() => navigate('/sign-in')}
              className="text-blue-600 hover:underline"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
