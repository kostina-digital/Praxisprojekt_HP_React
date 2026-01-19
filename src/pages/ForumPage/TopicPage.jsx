import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopicCard from './TopicCard.jsx';
import ReplyCard from './ReplyCard.jsx';
import { auth, realtimeDb } from '../../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue, off, push, set, update } from 'firebase/database';

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
    // Load topic from Realtime Database
    const topicRef = ref(realtimeDb, `forum/topics/${topicId}`);
    
    const unsubscribeTopic = onValue(topicRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTopic({ id: topicId, ...data });
        
      } else {
        setTopic(null);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error loading topic:', error);
      setLoading(false);
    });

    // Load replies from Realtime Database
    const repliesRef = ref(realtimeDb, `forum/topics/${topicId}/replies`);
    
    const unsubscribeReplies = onValue(repliesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object to array and sort by createdAt (oldest first)
        const repliesArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => {
          const timeA = a.createdAt || 0;
          const timeB = b.createdAt || 0;
          return timeA - timeB; // Oldest first
        });
        setReplies(repliesArray);
        
      } else {
        setReplies([]);
      }
    }, (error) => {
      console.error('Error loading replies:', error);
    });

    // Increment views when topic is loaded (only once per page load)
    if (topicId) {
      const topicRef = ref(realtimeDb, `forum/topics/${topicId}`);
      onValue(topicRef, (snapshot) => {
        const topicData = snapshot.val();
        if (topicData) {
          const currentViews = topicData.views || 0;
          update(topicRef, {
            views: currentViews + 1
          });
        }
      }, { onlyOnce: true });
    }

    return () => {
      off(topicRef);
      off(repliesRef);
    };
  }, [topicId, currentUser]);

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
      // Save reply to Realtime Database
      const repliesRef = ref(realtimeDb, `forum/topics/${topicId}/replies`);
      const newReplyRef = push(repliesRef);
      
      const replyData = {
        author: currentUser.email?.split('@')[0] || currentUser.displayName || 'User',
        authorEmail: currentUser.email,
        content: trimmedContent,
        createdAt: Date.now(),
        replyingTo: replyingTo?.id || null,
        replyingToAuthor: replyingTo?.author || null,
        replyingToContent: replyingTo?.content || null // Store quoted content
      };

      await set(newReplyRef, replyData);
      
      // Update topic replies count and lastReply timestamp
      const topicRef = ref(realtimeDb, `forum/topics/${topicId}`);
      const currentRepliesCount = topic?.repliesCount || 0;
      await update(topicRef, {
        repliesCount: currentRepliesCount + 1,
        lastReply: Date.now()
      });
      
      // Clear form and replyingTo
      setReplyContent('');
      setReplyingTo(null);
      
      console.log('Reply posted successfully');
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
              <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Replying to:</span>
                    <span className="font-semibold text-blue-700">{replyingTo.author}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyContent('');
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    ✕ Cancel
                  </button>
                </div>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-sm text-gray-700 italic">
                    "{replyingTo.content}"
                  </p>
                </div>
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
