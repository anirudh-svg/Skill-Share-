import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Sarah Miller',
      content: 'Hi there! I saw your profile and I\'m interested in learning Python. I can teach you UI/UX design in return.',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'That sounds great! I\'d love to learn UI/UX design. When are you available for a session?',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Sarah Miller',
      content: 'I\'m free this Saturday at 2 PM. Does that work for you?',
      timestamp: '10:35 AM',
      isOwn: false
    }
  ]);

  const conversations = [
    { id: 1, name: 'Sarah Miller', lastMessage: 'I\'m free this Saturday at 2 PM', time: '10:35 AM', unread: 0 },
    { id: 2, name: 'Michael Chen', lastMessage: 'Thanks for the feedback!', time: 'Yesterday', unread: 3 },
    { id: 3, name: 'Emma Rodriguez', lastMessage: 'Looking forward to our session', time: 'Oct 20', unread: 0 }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Conversations List */}
        <div className="lg:w-1/3">
          <div className="profile-card">
            <h2 className="text-xl font-bold mb-4">Conversations</h2>
            
            <div className="space-y-2">
              {conversations.map(conversation => (
                <div 
                  key={conversation.id} 
                  className="p-3 rounded-lg hover:bg-gray-700 cursor-pointer flex justify-between"
                >
                  <div>
                    <h3 className="font-bold">{conversation.name}</h3>
                    <p className="text-gray-400 text-sm truncate">{conversation.lastMessage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-xs">{conversation.time}</p>
                    {conversation.unread > 0 && (
                      <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mt-1">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Chat Window */}
        <div className="lg:w-2/3 flex flex-col">
          <div className="profile-card flex-1 flex flex-col">
            <div className="flex items-center mb-4 pb-2 border-b border-gray-700">
              <img 
                src="https://via.placeholder.com/40" 
                alt="Sarah Miller" 
                className="w-10 h-10 rounded-full mr-3"
              />
              <h2 className="text-xl font-bold">Sarah Miller</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-96">
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.isOwn 
                        ? 'bg-indigo-600 rounded-br-none' 
                        : 'bg-gray-700 rounded-bl-none'
                    }`}
                  >
                    {!msg.isOwn && (
                      <p className="text-xs font-bold mb-1">{msg.sender}</p>
                    )}
                    <p>{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.isOwn ? 'text-indigo-200' : 'text-gray-400'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                className="input-field flex-1"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="btn-primary">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;