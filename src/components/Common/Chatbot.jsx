import React, { useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (msg) => {
    setMessages([...messages, { sender: 'user', text: msg }]);
    // Send to AI backend
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: 'How can I help you with your tax filing?' }]);
    }, 500);
  };

  return (
    <div className={`chatbot ${isOpen ? 'open' : 'closed'}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="chatbot-toggle">
        💬
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>Tax Assistant</h4>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <input type="text" placeholder="Ask a question..." onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e.target.value)} />
        </div>
      )}
    </div>
  );
}
