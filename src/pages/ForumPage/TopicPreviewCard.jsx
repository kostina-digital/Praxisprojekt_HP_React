import { Link } from 'react-router-dom';

export default function TopicPreviewCard({ topic }) {
  if (!topic) return null;

  const topicId = topic.id || '1'; // In real app, use actual topic ID

  return (
    <Link to={`/forum/topic/${topicId}`} className="block">
      <div className="flex items-center justify-between border p-4 rounded shadow-sm bg-white hover:shadow-md transition-shadow mb-3">
        <div className="flex-1">
          <h3 className="h3_style mb-2 hover:text-blue-600">
            {topic.title || 'Untitled Topic'}
          </h3>
          <div className="flex items-center text-xs text-gray-400 gap-2 mb-2">
            <span>
              Author: <b className="text-gray-600">{topic.author || 'Anonymous'}</b>
            </span>
            <span>•</span>
            <span>{topic.repliesCount || 0} replies</span>
            <span>•</span>
            <span>{topic.views || 0} views</span>
            <span>•</span>
            <span>
              {topic.lastReply 
                ? new Date(topic.lastReply).toLocaleDateString()
                : topic.createdAt 
                  ? new Date(topic.createdAt).toLocaleDateString()
                  : 'Recently'}
            </span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {topic.content || 'No description available'}
          </p>
        </div>
        <button className="self-start mt-2 text-sm text-blue-600 hover:underline ml-4">
          Read more →
        </button>
      </div>
    </Link>
  );
}
