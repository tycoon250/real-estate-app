import { useEffect, useState, useRef } from "react";
import { Send, RefreshCw, Info, Phone, Calendar, Mail, ArrowRight, MessageSquare, ImageIcon, Paperclip, X } from 'lucide-react';

import {  
  initializeSocket, 
  joinConversationRoom, 
  leaveConversationRoom, 
  subscribeToNewMessages, 
  subscribeToTypingEvents
} from "../../api/api";
import { useAuthContext } from "./AuthContext";
import { getMessages, sendMessage } from "../../api/chatAPI";

export function ChatBox({ selectedUser, setLoading, socketReady }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (!selectedUser || !socketReady) return;
  
    let activeSocket;
    let messageCleanup;
    let typingCleanup;
  
    const handleNewMessage = (newMessage) => {
      if (newMessage.conversationId === selectedUser.conversation._id) {
        setMessages(prev => [
          ...prev,
          {
            ...newMessage,
            isOwner: newMessage.sender._id === user._id,
          }
        ]);
        scrollToBottom();
      }
    };
  
    const handleTyping = (data) => {
      if (
        data.conversationId === selectedUser.conversation._id &&
        data.userId !== user._id
      ) {
        setIsTyping(data.isTyping);
      }
    };
  
    const reconnectHandler = () => {
      joinConversationRoom(selectedUser.conversation._id);
    };
  
    const setupSocket = async () => {
      try {
        const socket = await initializeSocket();
        activeSocket = socket;
        joinConversationRoom(selectedUser.conversation._id);
        socket.on("reconnect", reconnectHandler);
        messageCleanup = subscribeToNewMessages(handleNewMessage);
        typingCleanup = subscribeToTypingEvents(handleTyping);
      } catch (error) {
        console.error("Socket setup failed:", error);
        setError("Failed to connect to chat. Please refresh the page.");
      }
    };
  
    const fetchMessages = async () => {
      setLocalLoading(true);
      setLoading(true);
      setError("");
      
      try {
        const messagesData = await getMessages(selectedUser.conversation._id);
        const processedMessages = messagesData.map(msg => ({
          ...msg,
          isOwner: msg.sender._id === user._id,
        }));
        setMessages(processedMessages);
        scrollToBottom();
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to load messages. Please try again.");
      } finally {
        setLocalLoading(false);
        setLoading(false);
      }
    };
  
    fetchMessages();
    setupSocket();
  
    return () => {
      if (activeSocket) {
        activeSocket.off("reconnect", reconnectHandler);
      }
      leaveConversationRoom(selectedUser?.conversation?._id);
      messageCleanup?.();
      typingCleanup?.();
    };
  }, [selectedUser, socketReady, user._id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    
    // Validate message content
    if ((!newMessage.trim() && attachments.length === 0) || !selectedUser || isSending) {
      return;
    }

    setIsSending(true);
    setError("");

    try {
      const messageData = {
        conversationId: selectedUser.conversation._id,
        text: newMessage.trim(),
        attachments: attachments.map(att => att.url),
      };

      const response = await sendMessage(messageData);
      

      setNewMessage("");
      setAttachments([]);
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

    for (const file of files) {
      if (file.size > maxSize) {
        setError(`File ${file.name} is too large. Maximum size is 5MB.`);
        continue;
      }

      if (!allowedTypes.includes(file.type)) {
        setError(`File ${file.name} is not supported. Please use JPG, PNG, GIF, or PDF.`);
        continue;
      }

      try {
        // Create a preview URL
        const previewUrl = URL.createObjectURL(file);
        
        setAttachments(prev => [
          ...prev, 
          { 
            file, 
            url: previewUrl, 
            name: file.name,
            type: file.type
          }
        ]);
      } catch (error) {
        console.error("Error processing file:", error);
        setError(`Failed to process file ${file.name}`);
      }
    }

    e.target.value = null;
  };

  const removeAttachment = (index) => {
    setAttachments(prev => {
      const newAttachments = [...prev];
      URL.revokeObjectURL(newAttachments[index].url);
      newAttachments.splice(index, 1);
      return newAttachments;
    });
  };

  const formatMessageTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatMessageDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  if (!selectedUser) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gray-50 p-8">
        <div className="text-center max-w-md">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Select a conversation
          </h3>
          <p className="text-gray-500 mb-6">
            Choose a contact to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-lg font-semibold text-blue-600">
                {selectedUser.sender.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {selectedUser.sender.name}
              </h3>
              <p className="text-sm text-gray-500">
                {selectedUser.sender.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {localLoading ? (
          <div className="flex justify-center items-center h-full">
            <RefreshCw className="h-8 w-8 text-gray-400 animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No messages yet
            </h3>
            <p className="text-gray-500">
              Start the conversation by sending a message.
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={msg._id}
              className={`flex ${msg.isOwner ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] ${
                  msg.isOwner ? "bg-blue-600 text-white" : "bg-white"
                } rounded-lg p-3 shadow-sm`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                <span className="text-xs opacity-75 mt-1 block">
                  {formatMessageTime(msg.createdAt)}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="p-2 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {attachments.map((attachment, index) => (
              <div key={index} className="relative group">
                {attachment.type.startsWith('image/') ? (
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                    <img 
                      src={attachment.url}
                      alt={attachment.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-white border border-gray-200">
                    <Paperclip className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                <button 
                  onClick={() => removeAttachment(index)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input 
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            multiple
            accept="image/*,application/pdf"
          />
          
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              disabled={isSending}
            />
          </div>

          <button
            type="submit"
            disabled={(!newMessage.trim() && attachments.length === 0) || isSending}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSending ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>

        {isTyping && (
          <div className="mt-2 text-sm text-gray-500">
            {selectedUser.sender.name} is typing...
          </div>
        )}
      </div>
    </div>
  );
}