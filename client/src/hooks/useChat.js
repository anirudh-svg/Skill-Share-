import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { chatAPI } from '../services/api';

let socket;

const useChat = (recipientId) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const typingTimeoutRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    
    // Join room
    socket.emit('join_room', `chat_${recipientId}`);
    
    // Listen for new messages
    socket.on('receive_message', (message) => {
      setMessages(prev => [...prev, message]);
    });
    
    // Listen for typing indicators
    socket.on('user_typing', (data) => {
      if (data.userId !== recipientId) return;
      
      setTyping(true);
      
      // Clear previous timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Set new timeout
      typingTimeoutRef.current = setTimeout(() => {
        setTyping(false);
      }, 3000);
    });
    
    // Cleanup
    return () => {
      socket.disconnect();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [recipientId]);

  // Fetch conversation history
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const res = await chatAPI.getConversation(recipientId);
        setMessages(res.data);
      } catch (error) {
        console.error('Error fetching conversation:', error);
      }
    };
    
    if (recipientId) {
      fetchConversation();
    }
  }, [recipientId]);

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    try {
      const messageData = {
        recipientId,
        content: newMessage.trim()
      };
      
      // Send via API
      const res = await chatAPI.sendMessage(messageData);
      
      // Emit via socket for real-time delivery
      socket.emit('send_message', {
        ...res.data,
        roomId: `chat_${recipientId}`
      });
      
      setMessages(prev => [...prev, res.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Send typing indicator
  const sendTyping = () => {
    if (!newMessage.trim()) return;
    
    socket.emit('typing', {
      userId: recipientId,
      roomId: `chat_${recipientId}`
    });
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    typing,
    onlineUsers,
    sendMessage,
    sendTyping
  };
};

export default useChat;