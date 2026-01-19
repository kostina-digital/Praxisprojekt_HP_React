export default function ReplyCard({ reply, onReplyClick }) {
  if (!reply) return null;

  return (
    <div className="flex flex-col gap-2 border p-4 rounded shadow-sm bg-white mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 font-bold">
              {reply.author?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <p className="font-semibold">{reply.author || 'Anonymous'}</p>
            <p className="text-xs text-gray-500">
              {reply.createdAt 
                ? new Date(reply.createdAt.seconds * 1000).toLocaleDateString()
                : 'Recently'}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        {reply.replyingToAuthor && (
          <div className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">↳ Replying to {reply.replyingToAuthor}</span>
          </div>
        )}
        <p className="text-gray-700">{reply.content || 'No content'}</p>
      </div>
      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
        <button 
          onClick={() => {
            // TODO: Implement like functionality
            console.log('Like reply:', reply.id);
          }}
          className="hover:text-blue-600 transition-colors"
        >
          👍 Like
        </button>
        <button 
          onClick={() => {
            // TODO: Implement dislike functionality
            console.log('Dislike reply:', reply.id);
          }}
          className="hover:text-red-600 transition-colors"
        >
          👎 Dislike
        </button>
        <button 
          onClick={onReplyClick || (() => console.log('Reply to:', reply.id))}
          className="hover:text-gray-700 transition-colors"
        >
          💬 Reply
        </button>
      </div>
    </div>
  );
}
