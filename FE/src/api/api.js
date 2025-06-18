const API_REAL_TIME_BASE_URL = process.env.REACT_APP_API_URL;
/////////////////////////////////////////////////////////////////////////////////
// Socket.io connection setup
let socket = null;
let socketListeners = new Map();

// Updated initializeSocket function
export const initializeSocket = () => {
  // Return existing connected socket
  if (socket?.connected) return Promise.resolve(socket);

  // Return existing pending connection
  if (socket?.pending) return socket.pending;

  return import("socket.io-client").then(({ io }) => {
    return new Promise((resolve, reject) => {
      
      socket = io(API_REAL_TIME_BASE_URL, {
        autoConnect: true,
        reconnectionAttempts: 5,
        withCredentials: true
      });

      // Store pending promise
      socket.pending = { resolve, reject };

      // Connection handlers
      socket.once("connect", () => {
        delete socket.pending;
        resolve(socket);
      });

      socket.once("connect_error", (err) => {
        console.error("Connection failed:", err);
        delete socket.pending;
        reject(err);
      });
    });
  });
};
export const joinConversationRoom = (conversationId) => {
  if (!socket) {
    console.error("Socket not initialized when trying to join room");
    return;
  }

  socket.emit("joinConversation", conversationId);
};

export const leaveConversationRoom = (conversationId) => {
  if (!socket) {
    console.error("Socket not initialized when trying to leave room");
    return;
  }

  socket.emit("leaveRoom", conversationId);
};

export const subscribeToNewMessages = (callback) => {
  if (!socket) {
    console.error(
      "Socket not initialized when trying to subscribe to messages"
    );
    return () => {}; // Return empty cleanup function
  }


  // Remove any existing listener for this event
  if (socketListeners.has("newMessage")) {
    socket.off("newMessage", socketListeners.get("newMessage"));
  }

  // Add new listener
  socket.on("newMessage", (message) => {
    callback(message);
  });

  // Store the callback for cleanup
  socketListeners.set("newMessage", callback);

  // Return cleanup function
  return () => {
    if (socket) {
      socket.off("newMessage", callback);
      socketListeners.delete("newMessage");
    }
  };
};

export const subscribeToTypingEvents = (callback) => {
  if (!socket) {
    console.error(
      "Socket not initialized when trying to subscribe to typing events"
    );
    return () => {}; // Return empty cleanup function
  }


  // Remove any existing listener for this event
  if (socketListeners.has("typing")) {
    socket.off("typing", socketListeners.get("typing"));
  }

  // Add new listener
  socket.on("typing", (data) => {
    callback(data);
  });

  // Store the callback for cleanup
  socketListeners.set("typing", callback);

  // Return cleanup function
  return () => {
    if (socket) {
      socket.off("typing", callback);
      socketListeners.delete("typing");
    }
  };
};

export const emitTypingEvent = (conversationId, isTyping) => {
  if (!socket) {
    console.error("Socket not initialized when trying to emit typing event");
    return;
  }

  socket.emit("typing", { conversationId, isTyping });
};

export const subscribeToMessagesRead = (callback) => {
  if (!socket) {
    console.error("Socket not initialized when trying to subscribe to messages read events");
    return () => {}; // Return empty cleanup function
  }


  // Remove any existing listener for this event
  if (socketListeners.has("messages-read")) {
    socket.off("messages-read", socketListeners.get("messages-read"));
  }

  // Add new listener
  socket.on("messages-read", (data) => {
    callback(data);
  });

  // Store the callback for cleanup
  socketListeners.set("messages-read", callback);

  // Return cleanup function
  return () => {
    if (socket) {
      socket.off("messages-read", callback);
      socketListeners.delete("messages-read");
    }
  };
};

export const emitMarkAsRead = (conversationId) => {
  if (!socket) {
    console.error("Socket not initialized when trying to mark messages as read");
    return;
  }

  socket.emit("markAsRead", { conversationId });
};


export const unsubscribeFromAllEvents = () => {
  if (!socket) return;


  // Unsubscribe from all events
  socketListeners.forEach((callback, event) => {
    socket.off(event, callback);
  });

  // Clear the listeners map
  socketListeners.clear();
};
