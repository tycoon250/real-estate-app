import React from "react"


export function ChatHeader({ conversation, onBack, currentUser }) {
  const otherParticipant = conversation.participants.find((p) => p._id !== currentUser?._id)

  return (
    <div className="bg-white border-b border-gray-200 py-3 px-4 flex items-center sticky top-0 z-10">
      <button className="md:hidden mr-2 p-2 rounded-full hover:bg-gray-100 transition-colors" onClick={onBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="relative h-10 w-10 flex-shrink-0 mr-3">
        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-lg font-medium text-gray-600 overflow-hidden">
          {otherParticipant?.profileImage ? (
            <img
              src={`${process.env.REACT_APP_API_URL}${otherParticipant.profileImage}` || "/placeholder.svg"}
              alt={otherParticipant.name || "User"}
              className="w-full h-full object-cover"
            />
          ) : (
            otherParticipant?.name?.charAt(0)?.toUpperCase() || "U"
          )}
        </div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>

      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{otherParticipant?.name || "Unknown User"}</h3>

        {conversation.product && (
          <div className="flex items-center text-xs text-gray-500">
            <span>Regarding: </span>
            <div className="inline-flex items-center gap-1 ml-1 px-1.5 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700">
              {conversation.product.title}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

