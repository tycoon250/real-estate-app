import { initializeSocket } from '../../api/api'
import React, { useEffect } from 'react'
import { ChatInterface } from './chat-interface'

const Chat = () => {
    useEffect(() => {
        // Initialize socket connection when the app loads
        initializeSocket().catch((err) => {
          console.error("Failed to initialize socket:", err)
        })
    
        // Cleanup on unmount
        return () => {
          // We don't need to disconnect the socket here as it's managed globally
        }
      }, [])
    
  return (
    <main className="h-screen bg-gray-50">
      <ChatInterface />
    </main>
  )
}

export default Chat
