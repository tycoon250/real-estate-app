import { useEffect, useState } from "react";
import { Clock, MessageSquare, Search, RefreshCw } from 'lucide-react';
import { subscribeToNewMessages } from "../../api/api";
import { getConversations, getUnreadMessages, markAsRead } from "../../api/chatAPI";

export function MessagesList({ onSelectUser, setLoading, socketReady }) {
  const [conversations, setConversations] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [unreadCounts, setUnreadCounts] = useState({});
  const API_URL = process.env.REACT_APP_API_URL

  const fetchData = async () => {
    setLocalLoading(true);
    setLoading(true);
    try {
      const [conversationsData, unreadData] = await Promise.all([
        getConversations(),
        getUnreadMessages(),
      ]);
      
      // Create unread counts map
      const unreadMap = {};
      unreadData.forEach(msg => {
        unreadMap[msg.conversationId] = (unreadMap[msg.conversationId] || 0) + 1;
      });
      
      setConversations(conversationsData);
      setUnreadCounts(unreadMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLocalLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Only set up socket subscription if socket is ready
    if (socketReady) {
      
      // Subscribe to new messages for real-time updates
      const cleanup = subscribeToNewMessages((newMessage) => {
        
        // Update conversations with new message
        setConversations(prevConversations => {
          return prevConversations.map(convo => {
            if (convo._id === newMessage.conversationId) {
              // If this isn't the active conversation, increment unread count
              if (activeConversationId !== newMessage.conversationId) {
                setUnreadCounts(prev => ({
                  ...prev,
                  [newMessage.conversationId]: (prev[newMessage.conversationId] || 0) + 1
                }));
              }
              
              return {
                ...convo,
                lastMessage: newMessage.text,
                updatedAt: newMessage.createdAt
              };
            }
            return convo;
          });
        });
      });

      return () => {
        // Clean up socket subscription
        cleanup();
      };
    }
  }, [activeConversationId, socketReady]); // Add socketReady to dependencies

  
  // Filter and sort conversations
  const filteredConversations = conversations
    .filter(convo => {
      if (!convo.participants || !convo.product) return false;
      
      const participant = convo.participants.find(p => p._id !== convo.product.createdBy);
      if (!participant) return false;
      
      return (
        participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        convo.product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const handleRefresh = () => {
    fetchData();
  };

  const handleSelectConversation = async (conversation) => {
    setActiveConversationId(conversation._id);
    
    // Find the customer (participant who is not the product creator)
    const customer = conversation.participants.find(
      p => p._id !== conversation.product.createdBy
    );
    
    onSelectUser({
      _id: conversation._id,
      conversation: conversation,
      sender: customer,
      product: conversation.product,
      unreadCount: unreadCounts[conversation._id] || 0
    });

    // Mark as read if there are unread messages
    if (unreadCounts[conversation._id]) {
      try {
        await markAsRead(conversation._id);
        setUnreadCounts(prev => ({
          ...prev,
          [conversation._id]: 0
        }));
      } catch (error) {
        console.error("Error marking as read:", error);
      }
    }
  };

  const formatLastActive = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffMs = now - messageDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return messageDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="h-full flex flex-col bg-white ">
      {/* Loading Bar */}
      <div className={`h-0.5 bg-blue-600 transition-all duration-300 ${localLoading ? "opacity-100" : "opacity-0"}`} />

      {/* Search Header */}
      <div className="p-4 border-b border-gray-200 ">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100  border-2 border-transparent focus:border-blue-500 focus:outline-none transition-colors "
          />
          <Search className="h-4 w-4 text-gray-500  absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {localLoading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-4 animate-pulse">
                <div className="h-12 w-12 rounded-full bg-gray-200" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-1/3 bg-gray-200  rounded" />
                  <div className="h-4 w-5/6 bg-gray-200  rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400  mb-3" />
            <p className="text-gray-600  font-medium">No conversations found</p>
            {searchTerm && (
              <p className="text-sm text-gray-500  mt-1">
                Try a different search term
              </p>
            )}
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 ">
            {filteredConversations.map((conversation) => {
              if (!conversation.participants || !conversation.product) return null;
              
              const participant = conversation.participants.find(p => p._id !== conversation.product.createdBy);
              if (!participant) return null;
              
              const unreadCount = unreadCounts[conversation._id] || 0;
              const lastMessage = conversation.lastMessage || "";

              return (
                <li
                  key={conversation._id}
                  onClick={() => handleSelectConversation(conversation)}
                  className={`transition-all duration-200 cursor-pointer ${
                    activeConversationId === conversation._id
                      ? "bg-blue-50  border-l-4 border-blue-500"
                      : unreadCount > 0
                      ? "bg-gray-50  border-l-4 border-blue-400"
                      : "hover:bg-gray-50 border-l-4 border-transparent"
                  }`}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="h-12 w-12 rounded-full bg-gray-200  overflow-hidden">
                            {participant.profileImage ? (
                              <img 
                                src={`${API_URL}${participant.profileImage}`}
                                alt={participant.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-blue-100  text-blue-600  font-semibold text-lg">
                                {participant.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          {unreadCount > 0 && (
                            <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-medium">
                              {unreadCount}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {participant.name}
                          </h3>
                          <p className="text-sm text-gray-500 ">
                            {participant.email}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500  flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatLastActive(conversation.updatedAt)}
                      </span>
                    </div>

                    <div className="ml-15">
                      <p className="text-sm text-gray-600  line-clamp-1 mb-2">
                        {lastMessage || "No messages yet"}
                      </p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ">
                        {conversation.product.title}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Refresh Button */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
        <button
          onClick={handleRefresh}
          className="w-full py-2.5 px-4 rounded-lg bg-white  border border-gray-200 text-gray-700  font-medium flex items-center justify-center space-x-2 hover:bg-gray-50  transition-colors duration-200 shadow-sm"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh Conversations</span>
        </button>
      </div>
    </div>
  );
}