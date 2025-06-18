import { format } from "date-fns";

export function ConversationList({
  conversations,
  selectedConversation,
  unreadCounts,
  loading,
  onSelectConversation,
  currentUser,
}) {
  const API_URL = process.env.REACT_APP_API_URL

  if (loading && conversations.length === 0) {
    return (
      <div className="h-full">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Conversations</h2>
        </div>
        <div className="p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-start space-x-4 p-3 rounded-xl animate-pulse"
            >
              <div className="h-12 w-12 rounded-full bg-gray-200 flex-shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-1/3 bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
                <div className="h-3 w-1/4 bg-gray-200 rounded mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="h-full">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Conversations</h2>
        </div>
        <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No conversations yet
          </h3>
          <p className="text-gray-500 max-w-xs">
            When you message someone, your conversations will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Conversations</h2>
      </div>
      <div className="overflow-y-auto flex-1">
        {conversations.map((conversation) => {
          const otherParticipant = conversation.participants.find(
            (p) => p._id !== currentUser?._id
          );

          const unreadCount = unreadCounts[conversation._id] || 0;

          return (
            <div
              key={conversation.id}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                selectedConversation?._id === conversation._id
                  ? "bg-blue-50"
                  : unreadCount > 0
                  ? "bg-gray-50 hover:bg-gray-100"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => onSelectConversation(conversation)}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-medium text-gray-600 overflow-hidden">
                    {otherParticipant?.profileImage ? (
                      <img
                        src={
                          `${API_URL}${otherParticipant.profileImage}`
                        }
                        alt={otherParticipant.name || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      otherParticipant?.name?.charAt(0)?.toUpperCase() || "U"
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {unreadCount}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium text-gray-900 truncate">
                      {otherParticipant?.name || "Unknown User"}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {format(new Date(conversation.updatedAt), "h:mm a")}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                    {conversation.lastMessage || "No messages yet"}
                  </p>

                  {conversation.product && (
                    <div className="mt-2">
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                        <span className="truncate max-w-[120px]">
                          {conversation.product.title}
                        </span>
                        {conversation.product.price && (
                          <span className="font-medium">
                            ${conversation.product.price}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
