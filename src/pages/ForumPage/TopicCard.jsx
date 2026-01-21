export default function TopicCard({ topic }) {
  if (!topic) return null;

  return (
    <div className="flex flex-col gap-4 border p-6 rounded shadow-md bg-white mb-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="h3_style mb-2">{topic.title || 'Untitled Topic'}</h3>
          <div className="flex items-center text-sm text-gray-500 gap-3 mb-4">
            <span>
              Author: <b className="text-gray-700">{topic.author || 'Anonymous'}</b>
            </span>
            <span>•</span>
            <span>
              {topic.createdAt 
                ? new Date(topic.createdAt).toLocaleDateString()
                : 'Recently'}
            </span>
            <span>•</span>
            <span>{topic.views || 0} views</span>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700 whitespace-pre-wrap">
              {topic.content || 'No content available'}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 pt-4 border-t">
        <div className="ml-auto text-sm text-gray-500">
          {topic.repliesCount || 0} replies
        </div>
      </div>
    </div>
  );
}
