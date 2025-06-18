import { format } from "date-fns"
import { MessageBubble } from "./message-bubble"


export function ChatWindow({ messages, isTyping, loading, currentUser, messagesEndRef }) {
  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = {}

    messages.forEach((msg) => {
      const date = new Date(msg.createdAt).toDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(msg)
    })

    return Object.entries(groups).map(([date, msgs]) => ({
      date,
      messages: msgs,
    }))
  }

  const groupedMessages = groupMessagesByDate()

  const formatMessageDate = (date) => {
    const messageDate = new Date(date)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (messageDate.toDateString() === today.toDateString()) {
      return "Today"
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return format(messageDate, "EEEE, MMMM d")
    }
  }

  if (loading && messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-8 w-8 text-gray-400 mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-sm text-gray-500">Loading messages...</p>
        </div>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="flex flex-col items-center text-center">
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
          <p className="text-gray-500 max-w-sm">Start the conversation by sending a message.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {groupedMessages.map((group, groupIndex) => (
        <div key={groupIndex}>
          <div className="flex justify-center mb-4">
            <div className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
              {formatMessageDate(group.date)}
            </div>
          </div>

          <div className="space-y-3">
            {group.messages.map((message, messageIndex) => {
              const isCurrentUser = message.sender._id === currentUser?._id
              const isFirstInGroup =
                messageIndex === 0 || group.messages[messageIndex - 1].sender._id !== message.sender._id
              const isLastInGroup =
                messageIndex === group.messages.length - 1 ||
                group.messages[messageIndex + 1].sender._id !== message.sender._id

              return (
                <MessageBubble
                  key={message._id}
                  message={message}
                  isCurrentUser={isCurrentUser}
                  isFirstInGroup={isFirstInGroup}
                  isLastInGroup={isLastInGroup}
                />
              )
            })}
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-gray-100 rounded-lg px-4 py-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}

