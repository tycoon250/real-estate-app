import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import { format } from "date-fns";
import {
  MessageSquare,
  Send,
  RefreshCw,
  ChevronLeft,
  Paperclip,
  Image,
  X,
  Phone,
  VideoIcon,
  MoreVertical,
  ShoppingBag,
  User,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";

// Base API configuration
const API_URL = process.env.REACT_APP_API_URL;
const API_BASE_URL = `${API_URL}/api/chat`;

// Socket.io connection
let socket = null;

const Index = () => {
  const { conversationId } = useParams();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const { user } = useAuth() 

  // Initialize socket connection
  useEffect(() => {
    if (!socket) {
      console.log("Initializing socket connection...");

      socket = io(API_URL, {
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socket.on("connect", () => {
        console.log("Socket connected successfully");
      });

      socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
        // Show error toast
      });

      socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });

      socket.on("reconnect", (attemptNumber) => {
        console.log(`Socket reconnected after ${attemptNumber} attempts`);
        // Show success toast
      });
    }

    return () => {
      if (socket) {
        socket.off("newMessage");
        socket.off("typing");
      }
    };
  }, []);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/conversations`, {
          withCredentials: true,
        });


        setConversations(response.data);
        const unreadResponse = await axios.get(`${API_BASE_URL}/unread`, {
          withCredentials: true,
        });

        const unreadMap = {};
        unreadResponse.data.forEach((msg) => {
          unreadMap[msg.conversationId] =
            (unreadMap[msg.conversationId] || 0) + 1;
        });

        setUnreadCounts(unreadMap);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // Subscribe to new messages
  useEffect(() => {
    if (!user) return;

    if (socket) {
      socket.on("newMessage", (message) => {
        if (
          selectedConversation &&
          message.conversationId === selectedConversation._id
        ) {
          setMessages((prev) => [...prev, message]);
          markMessagesAsRead(selectedConversation._id);
        } else {
          setUnreadCounts((prev) => ({
            ...prev,
            [message.conversationId]: (prev[message.conversationId] || 0) + 1,
          }));

          setConversations((prev) =>
            prev.map((convo) =>
              convo._id === message.conversationId
                ? {
                    ...convo,
                    lastMessage: message.text,
                    updatedAt: message.createdAt,
                  }
                : convo
            )
          );
        }
        scrollToBottom();
      });

      socket.on("typing", (data) => {
        if (
          selectedConversation &&
          data.conversationId === selectedConversation._id &&
          data.userId !== user._id
        ) {
          setIsTyping(data.isTyping);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("newMessage");
        socket.off("typing");
      }
    };
  }, [selectedConversation, user]);

  // Fetch messages when a conversation is selected
  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);

        if (socket) {
          socket.emit("joinRoom", selectedConversation._id);
        }

        const response = await axios.get(
          `${API_BASE_URL}/messages/${selectedConversation._id}`,
          {
            withCredentials: true,
          }
        );

        setMessages(response.data);
        await markMessagesAsRead(selectedConversation._id);

        setUnreadCounts((prev) => ({
          ...prev,
          [selectedConversation._id]: 0,
        }));
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    return () => {
      if (socket && selectedConversation) {
        socket.emit("leaveRoom", selectedConversation._id);
      }
    };
  }, [selectedConversation]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();

    if (
      (!newMessage.trim() && attachments.length === 0) ||
      !selectedConversation ||
      sendingMessage
    )
      return;

    setSendingMessage(true);
    try {
      const messageData = {
        conversationId: selectedConversation._id,
        text: newMessage,
        attachments: attachments.map((att) => att.url),
      };

      const response = await axios.post(
        `${API_BASE_URL}/message`,
        messageData,
        {
          withCredentials: true,
        }
      );

      setNewMessage("");
      setAttachments([]);

      socket.emit("sendMessage", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSendingMessage(false);
    }
  };

  const markMessagesAsRead = async (conversationId) => {
    try {
      await axios.post(
        `${API_BASE_URL}/mark-as-read`,
        { conversationId },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach((file) => {
      const previewUrl = URL.createObjectURL(file);
      setAttachments((prev) => [
        ...prev,
        {
          file,
          url: previewUrl,
          name: file.name,
          type: file.type,
        },
      ]);
    });

    e.target.value = null;
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => {
      const newAttachments = [...prev];
      URL.revokeObjectURL(newAttachments[index].url);
      newAttachments.splice(index, 1);
      return newAttachments;
    });
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (socket && selectedConversation && user) {
      socket.emit("typing", {
        conversationId: selectedConversation._id,
        userId: user._id,
        isTyping: e.target.value.length > 0,
      });
    }
  };

  const formatMessageTime = (date) => {
    return format(new Date(date), "h:mm a");
  };

  const formatMessageDate = (date) => {
    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return format(messageDate, "EEEE, MMMM d");
    }
  };

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = {};

    messages.forEach((msg) => {
      const date = new Date(msg.createdAt).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(msg);
    });

    return Object.entries(groups).map(([date, msgs]) => ({
      date,
      messages: msgs,
    }));
  };

  const groupedMessages = groupMessagesByDate();


  return (
    <div className="flex flex-col h-screen bg-[#f5f5f7] overflow-hidden">
      {/* Main Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200/50 px-6 py-4">
        <h1 className="text-xl font-medium tracking-tight text-gray-900">
          Messages
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Chat with sellers about products you're interested in
        </p>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Conversations List */}
        <div
          className={`border-r border-gray-200/60 bg-white/80 backdrop-blur-sm
            ${selectedConversation ? "hidden md:block md:w-1/3" : "w-full md:w-1/3"}
            transition-all duration-300 ease-in-out
          `}
        >
          <div className="p-4 border-b border-gray-200/60 sticky top-0 z-50 backdrop-blur-sm bg-white/80">
            <h2 className="text-base font-medium flex items-center gap-2 text-gray-900">
              <MessageSquare className="h-4 w-4 text-gray-500" />
              Conversations
            </h2>
          </div>

          <div className="overflow-auto h-auto scrollbar-thin">
            {loading && !conversations.length ? (
              <div className="p-4 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-start space-x-4 p-3 rounded-xl relative overflow-hidden animate-pulse"
                  >
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-1/3 bg-gray-200 rounded" />
                      <div className="h-4 w-5/6 bg-gray-200 rounded" />
                      <div className="h-3 w-1/4 bg-gray-200 rounded mt-1" />
                    </div>
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                ))}
              </div>
            ) : conversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No conversations yet
                </h3>
                <p className="text-gray-500 max-w-xs">
                  When you message a seller about a product, your conversations will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-px overflow-y-auto">
                {conversations.map((conversation) => {
                  const otherParticipant = conversation.participants.find(
                    (p) => p._id.toString() !== user._id.toString()
                  );

                  const unreadCount = unreadCounts[conversation._id] || 0;

                  return (
                    <div
                      key={conversation._id}
                      className={`px-4 py-3 cursor-pointer transition-all duration-200
                        ${selectedConversation?._id === conversation._id 
                          ? "bg-[#f0f3ff]" 
                          : unreadCount > 0 
                            ? "bg-gray-50" 
                            : "hover:bg-gray-50"
                        }
                      `}
                      onClick={() => handleSelectConversation(conversation)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-lg font-medium text-gray-600 overflow-hidden border border-gray-100">
                            {otherParticipant?.profileImage ? (
                              <img
                                src={`${API_URL}${otherParticipant.profileImage}`}
                                alt={otherParticipant?.name || "Unknown User"}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              otherParticipant?.name?.charAt(0)?.toUpperCase() || "U"
                            )}
                          </div>
                          {unreadCount > 0 && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                              {unreadCount}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
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
                                <ShoppingBag className="h-3 w-3 text-gray-500" />
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
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div
          className={`flex-1 flex flex-col bg-[#f5f5f7] ${
            !selectedConversation ? "hidden md:flex" : "flex"
          }`}
        >
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="backdrop-blur-lg bg-white/70 border-b border-gray-200/50 py-3 px-4 flex items-center">
                <button
                  className="mr-2 md:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setSelectedConversation(null)}
                >
                  <ChevronLeft className="h-5 w-5 text-gray-500" />
                  
                </button>

                <div className="relative h-10 w-10 flex-shrink-0 mr-3">
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-lg font-medium text-gray-600 overflow-hidden border border-gray-100">
                    {selectedConversation?.otherParticipant?.profileImage ? (
                      <img
                        src={`${API_URL}${selectedConversation.otherParticipant.profileImage}`}
                        alt={selectedConversation.otherParticipant?.name || "Unknown User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      selectedConversation.otherParticipant?.name?.charAt(0)?.toUpperCase() || "U"
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {selectedConversation.otherParticipant?.name || "Unknown User"}
                  </h3>

                  {selectedConversation.product && (
                    <div className="flex items-center text-xs text-gray-500">
                      <span>Regarding: </span>
                      <div className="inline-flex items-center gap-1 ml-1 px-1.5 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700">
                        {selectedConversation.product.title}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                    <Phone className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                    <VideoIcon className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                    <MoreVertical className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div 
                className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin" 
                ref={messagesContainerRef}
              >
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center">
                      <RefreshCw className="h-8 w-8 text-gray-400 mb-2 animate-spin" />
                      <p className="text-sm text-gray-500">Loading messages...</p>
                    </div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <MessageSquare className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No messages yet
                    </h3>
                    <p className="text-gray-500 max-w-sm">
                      Start the conversation by sending a message.
                    </p>
                  </div>
                ) : (
                  groupedMessages.map((group, groupIndex) => (
                    <div key={groupIndex} className="animate-fade-in">
                      <div className="flex justify-center mb-4">
                        <div className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
                          {formatMessageDate(group.messages[0].createdAt)}
                        </div>
                      </div>

                      <div className="space-y-3">
                        {group.messages.map((msg, msgIndex) => {
                          const isCurrentUser = msg.sender._id === user._id;
                          const hasAttachments =
                            msg.attachments && msg.attachments.length > 0;
                          const isFirstMessageOfGroup = msgIndex === 0 || 
                            group.messages[msgIndex - 1].sender._id !== msg.sender._id;
                          const isLastMessageOfGroup = msgIndex === group.messages.length - 1 || 
                            group.messages[msgIndex + 1].sender._id !== msg.sender._id;

                          return (
                            <div
                              key={msg._id}
                              className={`flex ${
                                isCurrentUser ? "justify-end" : "justify-start"
                              } ${isCurrentUser ? "animate-slide-in-right" : "animate-slide-in-left"}`}
                            >
                              <div
                                className={`max-w-[75%] ${
                                  isCurrentUser ? "order-1" : "order-2"
                                }`}
                              >
                                {!isCurrentUser && isFirstMessageOfGroup && (
                                  <div className="flex items-center mb-1 ml-2">
                                    <div className="relative h-6 w-6 flex-shrink-0 mr-1">
                                      <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 overflow-hidden">
                                        {msg.sender?.profileImage ? (
                                          <img
                                            src={`${API_URL}${msg.sender.profileImage}`}
                                            alt={msg.sender?.name || "Unknown"}
                                            className="w-full h-full object-cover"
                                          />
                                        ) : (
                                          msg.sender?.name?.charAt(0)?.toUpperCase() || "U"
                                        )}
                                      </div>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                      {msg.sender?.name || "Unknown"}
                                    </span>
                                  </div>
                                )}

                                <div
                                  className={`message-bubble px-4 py-2 break-words
                                  ${
                                    isCurrentUser
                                      ? "message-bubble-user"
                                      : "message-bubble-other"
                                  }`}
                                >
                                  {msg.text && (
                                    <p className="text-sm whitespace-pre-wrap text-balance">
                                      {msg.text}
                                    </p>
                                  )}

                                  {hasAttachments && (
                                    <div
                                      className={`mt-2 ${
                                        msg.text ? "pt-2 border-t" : ""
                                      } 
                                      ${
                                        isCurrentUser
                                          ? "border-white/20"
                                          : "border-gray-200"
                                      }`}
                                    >
                                      <div className="grid grid-cols-2 gap-2">
                                        {msg.attachments.map(
                                          (attachment, index) => {
                                            const isImage = attachment.match(
                                              /\.(jpeg|jpg|gif|png)$/i
                                            );

                                            return isImage ? (
                                              <div
                                                key={index}
                                                className="relative rounded-lg overflow-hidden shadow-sm"
                                              >
                                                <img
                                                  src={attachment}
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
                                                <Paperclip className="h-3 w-3 mr-2 text-gray-500" />
                                                <span className="truncate text-gray-700">
                                                  {attachment.split("/").pop()}
                                                </span>
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div
                                  className={`text-xs text-gray-500 mt-1
                                  ${
                                    isCurrentUser ? "text-right mr-2" : "ml-2"
                                  }`}
                                >
                                  {formatMessageTime(msg.createdAt)}
                                  {isCurrentUser && isLastMessageOfGroup && (
                                    <span className="ml-2 text-xs">
                                      {msg.readBy?.includes(
                                        selectedConversation.otherParticipant
                                          ._id
                                      )
                                        ? "✓✓"
                                        : "✓"}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="message-bubble-other px-4 py-2">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 typing-dot"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 typing-dot"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 typing-dot"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Attachments preview */}
              {attachments.length > 0 && (
                <div className="p-2 border-t border-gray-200/50 bg-white/70 backdrop-blur-sm">
                  <div className="flex flex-wrap gap-2">
                    {attachments.map((attachment, index) => (
                      <div key={index} className="relative group">
                        {attachment.type.startsWith("image/") ? (
                          <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                            <img
                              src={attachment.url}
                              alt={attachment.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-white border border-gray-200 shadow-sm p-1">
                            <div className="text-xs text-center truncate">
                              <Paperclip className="h-4 w-4 mx-auto mb-1 text-gray-500" />
                              <span className="block truncate text-gray-700">
                                {attachment.name}
                              </span>
                            </div>
                          </div>
                        )}
                        <button
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                          onClick={() => removeAttachment(index)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200/50 bg-white/70 backdrop-blur-md">
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center gap-2"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    multiple
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                  >
                    <Paperclip className="h-5 w-5 text-gray-500" />
                  </button>

                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={handleTyping}
                      className="w-full py-2.5 px-4 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-gray-900 placeholder:text-gray-500"
                      disabled={sendingMessage}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={
                      (!newMessage.trim() && attachments.length === 0) ||
                      sendingMessage
                    }
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      (!newMessage.trim() && attachments.length === 0) || sendingMessage
                        ? "bg-gray-200 text-gray-500"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    } transition-colors flex-shrink-0 shadow-sm`}
                  >
                    {sendingMessage ? (
                      <RefreshCw className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="max-w-md">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 mx-auto">
                  <MessageSquare className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-500 mb-6">
                  Choose a conversation from the list to view your messages and respond.
                </p>
                {conversations.length === 0 && !loading && (
                  <div className="p-6 bg-white rounded-xl border border-gray-200 mt-4 glass-morphism">
                    <h4 className="font-medium mb-2 flex items-center gap-2 text-gray-900">
                      <User className="h-4 w-4" />
                      No conversations yet
                    </h4>
                    <p className="text-sm text-gray-500">
                      When you message a seller about a product, your conversations will appear here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
