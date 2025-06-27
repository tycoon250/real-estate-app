"use client"

import { useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import io from "socket.io-client"
import { getConversationDetails, getMessages, markAsRead, sendMessage } from "../api/chatAPI"
import { useAuth } from "../hooks/useAuth"
import { Send, Image, MoreVertical, ArrowLeft, Phone, VideoIcon, Paperclip, Smile } from "lucide-react"

const ChatPage = () => {
  const { conversationId } = useParams()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [conversation, setConversation] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const socket = useRef(null)
  const messagesEndRef = useRef(null)
  const messageContainerRef = useRef(null)
  const navigate = useNavigate()
  const { user } = useAuth()
  const API_URL = process.env.REACT_APP_API_URL;
  const sortMessages = (msgs) => {
    return msgs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [messagesRes, conversationRes] = await Promise.all([
          getMessages(conversationId),
          getConversationDetails(conversationId),
        ])
        const sortedMessages = sortMessages(messagesRes)
        setMessages(sortedMessages)
        setConversation(conversationRes)
        await markAsRead(conversationId)
      } catch (error) {
        console.error("Error fetching chat data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    socket.current = io(process.env.REACT_APP_API_URL)
    socket.current.emit("joinConversation", conversationId)

    socket.current.on("newMessage", (message) => {
      setMessages((prev) => sortMessages([...prev, message]))
      scrollToBottom()
    })

    return () => {
      socket.current.emit("leaveConversation", conversationId)
      socket.current.disconnect()
    }
  }, [conversationId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const messageToSend = {
      conversationId,
      text: newMessage,
      attachments: [],
    }

    try {
      setNewMessage("")
      scrollToBottom()
      await sendMessage(messageToSend)
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = {}
    messages.forEach((message) => {
      const date = formatDate(message.createdAt)
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
    })
    return groups
  }

  const getInitials = (name) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const messageGroups = groupMessagesByDate()
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          {conversation?.product && (
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {conversation.product.displayImage ? (
                  <img
                    src={`${API_URL}${conversation.product.displayImage}`}
                    alt={conversation.product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-semibold text-gray-800 line-clamp-1">{conversation.product.title}</h2>
                <p className="text-green-600 font-medium">${conversation.product.price}</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Phone call">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Video call">
            <VideoIcon className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="More options">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div ref={messageContainerRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-pulse text-gray-400">Loading messages...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-center">No messages yet</p>
            <p className="text-sm">Start the conversation by sending a message</p>
          </div>
        ) : (
          Object.entries(messageGroups).map(([date, dateMessages]) => (
            <div key={date} className="space-y-4">
              <div className="flex justify-center">
                <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">{date}</span>
              </div>
              {dateMessages.map((message) => {
                const isSender = message.sender._id === user._id
                return (
                  <div key={message._id} className={`flex ${isSender ? "justify-end" : "justify-start"} mb-3`}>
                    {!isSender && (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 mr-2 overflow-hidden">
                        {message.sender.profileImage ? (
                          <img
                            src={`${API_URL}${message.sender.profileImage}`
                              || "/placeholder.svg"}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-400 text-white text-xs font-bold">
                            {message.sender.name?.charAt(0) || "U"}
                          </div>
                        )}
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                        isSender
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <span className={`text-xs mt-1 block text-right ${isSender ? "text-blue-100" : "text-gray-500"}`}>
                        {formatTime(message.createdAt)}
                      </span>
                    </div>
                    {isSender && (
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 ml-2 overflow-hidden">
                        {user?.profileImage ? (
                          <img
                            src={`${API_URL}${user.profileImage}` || "/placeholder.svg"}
                            alt="Your avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-xs font-bold">
                            {user.name?.charAt(0) || "Y"}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <footer className="bg-white border-t border-gray-200 px-4 py-3">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Add attachment"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-gray-100 rounded-full px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Add emoji"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              newMessage.trim()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } transition-colors`}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </footer>
    </div>
  )
}

export default ChatPage

