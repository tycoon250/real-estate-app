import { format } from "date-fns";

const API_URL = process.env.REACT_APP_API_URL;

export function MessageBubble({
  message,
  isCurrentUser,
  isFirstInGroup,
  isLastInGroup,
}) {
  const formatMessageTime = (date) => {
    return format(new Date(date), "h:mm a");
  };

  const hasAttachments = message.attachments && message.attachments.length > 0;

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[75%] ${isCurrentUser ? "order-1" : "order-2"}`}>
        {!isCurrentUser && isFirstInGroup && (
          <div className="flex items-center mb-1 ml-2">
            <div className="relative h-6 w-6 flex-shrink-0 mr-1">
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 overflow-hidden">
                {message.sender.profileImage ? (
                  <img
                    src={`${API_URL}${message.sender.profileImage}` || "/placeholder.svg"}
                    alt={message.sender.name || "Unknown"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  message.sender.name?.charAt(0)?.toUpperCase() || "U"
                )}
              </div>
            </div>
            <span className="text-xs text-gray-500">
              {message.sender.name || "Unknown"}
            </span>
          </div>
        )}

        <div
          className={`px-4 py-2 rounded-2xl break-words ${
            isCurrentUser
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-900"
          } ${
            isFirstInGroup && !isLastInGroup
              ? isCurrentUser
                ? "rounded-br-sm"
                : "rounded-bl-sm"
              : ""
          } ${
            !isFirstInGroup && !isLastInGroup
              ? isCurrentUser
                ? "rounded-r-sm"
                : "rounded-l-sm"
              : ""
          } ${
            !isFirstInGroup && isLastInGroup
              ? isCurrentUser
                ? "rounded-tr-sm"
                : "rounded-tl-sm"
              : ""
          }`}
        >
          {message.text && (
            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
          )}

          {hasAttachments && (
            <div
              className={`mt-2 ${message.text ? "pt-2 border-t" : ""} ${
                isCurrentUser ? "border-white/20" : "border-gray-200"
              }`}
            >
              <div className="grid grid-cols-2 gap-2">
                {message.attachments.map((attachment, index) => {
                  const isImage = attachment.match(/\.(jpeg|jpg|gif|png)$/i);

                  return isImage ? (
                    <div
                      key={index}
                      className="relative rounded-lg overflow-hidden shadow-sm"
                    >
                      <img
                        src={attachment || "/placeholder.svg"}
                        alt="Attachment"
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="flex items-center p-2 rounded-lg bg-white/90 backdrop-blur text-xs shadow-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-2 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                      <span className="truncate text-gray-700">
                        {attachment.split("/").pop()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div
          className={`text-xs text-gray-500 mt-1 ${
            isCurrentUser ? "text-right mr-2" : "ml-2"
          }`}
        >
          {formatMessageTime(message.createdAt)}
          {isCurrentUser && isLastInGroup && (
            <span className="ml-2 text-xs">
              {message.readBy?.includes(message.conversationId) ? "✓✓" : "✓"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
