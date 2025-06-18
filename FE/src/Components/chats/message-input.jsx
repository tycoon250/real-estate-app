import { useState, useRef, } from "react"

export function MessageInput({ onSendMessage, onTyping, disabled }) {
  const [message, setMessage] = useState("")
  const [attachments, setAttachments] = useState([]);
  const [sending, setSending] = useState(false)
  const fileInputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if ((!message.trim() && attachments.length === 0) || disabled || sending) {
      return
    }

    setSending(true)

    try {
      // In a real app, you would upload attachments to a server here
      // For this example, we'll just use the local URLs
      const attachmentUrls = attachments.map((att) => att.url)

      await onSendMessage(message, attachmentUrls)
      setMessage("")
      setAttachments([])
      onTyping(false)
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setSending(false)
    }
  }

  const handleMessageChange = (e) => {
    const value = e.target.value
    setMessage(value)
    onTyping(value.length > 0)
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    files.forEach((file) => {
      const previewUrl = URL.createObjectURL(file)
      setAttachments((prev) => [
        ...prev,
        {
          file,
          url: previewUrl,
          name: file.name,
          type: file.type,
        },
      ])
    })

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeAttachment = (index) => {
    setAttachments((prev) => {
      const newAttachments = [...prev]
      URL.revokeObjectURL(newAttachments[index].url)
      newAttachments.splice(index, 1)
      return newAttachments
    })
  }

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {attachments.map((attachment, index) => (
            <div key={index} className="relative group">
              {attachment.type.startsWith("image/") ? (
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={attachment.url || "/placeholder.svg"}
                    alt={attachment.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-gray-50 border border-gray-200 p-1">
                  <div className="text-xs text-center truncate">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mx-auto mb-1 text-gray-500"
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
                    <span className="block truncate text-gray-700">{attachment.name}</span>
                  </div>
                </div>
              )}
              <button
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                onClick={() => removeAttachment(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} multiple />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          disabled={disabled || sending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
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
        </button>

        <button
          type="button"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          disabled={disabled || sending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>

        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={handleMessageChange}
            className="w-full py-2.5 px-4 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-gray-900 placeholder:text-gray-500"
            disabled={disabled || sending}
          />
        </div>

        <button
          type="submit"
          disabled={(!message.trim() && attachments.length === 0) || disabled || sending}
          className={`p-2.5 rounded-full ${
            (!message.trim() && attachments.length === 0) || disabled || sending
              ? "bg-gray-200 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } transition-colors flex-shrink-0 shadow-sm`}
        >
          {sending ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </form>
    </div>
  )
}

