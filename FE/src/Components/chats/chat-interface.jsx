import { useState, useEffect, useRef } from "react"
import {
  initializeSocket,
  joinConversationRoom,
  leaveConversationRoom,
  subscribeToNewMessages,
  subscribeToTypingEvents,
  emitTypingEvent,
  emitMarkAsRead,
  subscribeToMessagesRead,
} from "../../api/api"
import { ConversationList } from "./conversation-list"
import { ChatWindow } from "./chat-window"
import { MessageInput } from "./message-input"
import { ChatHeader } from "./chat-header"
import { useAuth } from "../../hooks/useAuth"

const API_URL = process.env.REACT_APP_API_URL_REQ

export function ChatInterface() {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [loading, setLoading] = useState(true)
  const [unreadCounts, setUnreadCounts] = useState({})
  const messagesEndRef = useRef(null)
  const { user } = useAuth()

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/chat/conversations`, {
          credentials: "include",
        })

        if (!response.ok) throw new Error("Failed to fetch conversations")

        const data = await response.json()
        setConversations(data)

        // Fetch unread counts
        const unreadResponse = await fetch(`${API_URL}/chat/unread`, {
          credentials: "include",
        })

        if (unreadResponse.ok) {
          const unreadData = await unreadResponse.json()
          const unreadMap = {}

          unreadData.forEach((msg) => {
            unreadMap[msg.conversationId] = (unreadMap[msg.conversationId] || 0) + 1
          })

          setUnreadCounts(unreadMap)
        }
      } catch (error) {
        console.error("Error fetching conversations:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchConversations()
    }
  }, [user])

  // Handle real-time events
  useEffect(() => {
    if (!user) return

    const setupSocketListeners = async () => {
      try {
        const socket = await initializeSocket()

        // Subscribe to new messages
        const unsubscribeMessages = subscribeToNewMessages((message) => {
          if (selectedConversation && message.conversationId === selectedConversation._id) {
            setMessages((prev) => [...prev, message])
            emitMarkAsRead(selectedConversation._id)
            scrollToBottom()
          } else {
            // Update unread counts for other conversations
            setUnreadCounts((prev) => ({
              ...prev,
              [message.conversationId]: (prev[message.conversationId] || 0) + 1,
            }))

            // Update last message in conversation list
            setConversations((prev) =>
              prev.map((convo) =>
                convo.id === message.conversationId
                  ? {
                      ...convo,
                      lastMessage: message.text,
                      updatedAt: message.createdAt,
                    }
                  : convo,
              ),
            )
          }
        })

        // Subscribe to typing events
        const unsubscribeTyping = subscribeToTypingEvents((data) => {
          if (selectedConversation && data.conversationId === selectedConversation._id && data.userId !== user.id) {
            setIsTyping(data.isTyping)
          }
        })

        // Subscribe to read receipts
        const unsubscribeRead = subscribeToMessagesRead((data) => {
          if (selectedConversation && data.conversationId === selectedConversation._id) {
            // Update read status of messages
            setMessages((prev) =>
              prev.map((msg) => ({
                ...msg,
                readBy: [...(msg.readBy || []), data.userId],
              })),
            )
          }
        })

        return () => {
          unsubscribeMessages()
          unsubscribeTyping()
          unsubscribeRead()
        }
      } catch (error) {
        console.error("Error setting up socket listeners:", error)
      }
    }

    const cleanup = setupSocketListeners()

    return () => {
      cleanup.then((unsubscribe) => {
        if (unsubscribe) unsubscribe()
      })
    }
  }, [selectedConversation, user])

  // Fetch messages when a conversation is selected
  useEffect(() => {
    if (!selectedConversation) return

    const fetchMessages = async () => {
      try {
        setLoading(true)

        // Join the conversation room
        joinConversationRoom(selectedConversation._id)

        const response = await fetch(`${API_URL}/chat/messages/${selectedConversation._id}`, {
          credentials: "include",
        })

        if (!response.ok) throw new Error("Failed to fetch messages")

        const data = await response.json()
        setMessages(data)

        // Mark messages as read
        emitMarkAsRead(selectedConversation._id)

        // Reset unread count for this conversation
        setUnreadCounts((prev) => ({
          ...prev,
          [selectedConversation._id]: 0,
        }))

        scrollToBottom()
      } catch (error) {
        console.error("Error fetching messages:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()

    return () => {
      if (selectedConversation) {
        leaveConversationRoom(selectedConversation._id)
      }
    }
  }, [selectedConversation])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation)
  }

  const handleSendMessage = async (text, attachments) => {
    if ((!text.trim() && attachments.length === 0) || !selectedConversation || !user) return

    try {
      const messageData = {
        conversationId: selectedConversation._id,
        text,
        attachments,
      }

      const response = await fetch(`${API_URL}/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(messageData),
      })

      if (!response.ok) throw new Error("Failed to send message")

      const newMessage = await response.json()

      // Add message to the UI immediately
      setMessages((prev) => {
        if (prev.some((msg) => msg._id === newMessage._id)) {
          return prev;
        }
        return [...prev, newMessage];
      });

      // Update conversation last message
      setConversations((prev) =>
        prev.map((convo) =>
          convo.id === selectedConversation._id
            ? {
                ...convo,
                lastMessage: text,
                updatedAt: new Date().toISOString(),
              }
            : convo,
        ),
      )

      scrollToBottom()
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const handleTyping = (isTyping) => {
    if (selectedConversation && user) {
      emitTypingEvent(selectedConversation._id, isTyping)
    }
  }
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Conversation List */}
      <div
        className={`${selectedConversation ? "hidden md:block" : "block"} w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 bg-white`}
      >
        <ConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          unreadCounts={unreadCounts}
          loading={loading}
          onSelectConversation={handleSelectConversation}
          currentUser={user}
        />
      </div>

      {/* Chat Area */}
      <div className={`${!selectedConversation ? "hidden md:flex" : "flex"} flex-col flex-1 bg-gray-50`}>
        {selectedConversation ? (
          <>
            <ChatHeader
              conversation={selectedConversation}
              onBack={() => setSelectedConversation(null)}
              currentUser={user}
            />

            <ChatWindow
              messages={messages}
              isTyping={isTyping}
              loading={loading}
              currentUser={user}
              messagesEndRef={messagesEndRef}
            />

            <MessageInput onSendMessage={handleSendMessage} onTyping={handleTyping} disabled={loading} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
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
            <h3 className="text-xl font-medium text-gray-900 mb-2">Select a conversation</h3>
            <p className="text-gray-500 max-w-md">
              Choose a conversation from the list to view your messages and respond.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

