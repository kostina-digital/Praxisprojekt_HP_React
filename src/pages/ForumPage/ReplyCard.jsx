export default function ReplyCard({ reply, onReplyClick }) {
  if (!reply) return null;

  return (
    <div className="flex gap-2 justify-between border p-4 rounded shadow-sm bg-white mb-4">
        <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 font-bold">
              {reply.author?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div>
            <p className="font-semibold">{reply.author || "Anonymous"}</p>
            <p className="text-xs text-gray-500">
              {reply.createdAt
                ? new Date(reply.createdAt).toLocaleDateString()
                : "Recently"}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        {reply.replyingToAuthor && (
          <div className="mb-3 p-2 bg-gray-50 border-l-4 border-gray-300 rounded">
            <div className="mb-1 text-xs text-gray-500">
              <span className="font-semibold">
                ↳ Replying to {reply.replyingToAuthor}
              </span>
            </div>
            {reply.replyingToContent && (
              <div className="bg-white p-2 rounded border border-gray-200">
                <p className="text-xs text-gray-600 italic line-clamp-2">
                  "{reply.replyingToContent}"
                </p>
              </div>
            )}
          </div>
        )}
        <p className="text-gray-700">{reply.content || "No content"}</p>
      </div>
      </div>
      <div className="flex items-center gap-4 mt-2 text-sm">
        <button
          onClick={onReplyClick || (() => console.log("Reply to:", reply.id))}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          💬 Reply
        </button>
      </div>
    </div>
  );
}
