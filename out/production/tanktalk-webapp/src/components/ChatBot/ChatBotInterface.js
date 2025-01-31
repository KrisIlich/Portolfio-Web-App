// ChatBotInterface.js
import React, { useEffect, useRef } from 'react';
import './ChatBot.css'; // or ChatBotInterface.css, if you prefer separate styling
import ReactMarkdown from 'react-markdown';


const ChatBotInterface = ({ conversation, isTyping }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  };

  useEffect(scrollToBottom, [conversation, isTyping]);

  return (
    <div className="chatbot-interface">
      <div className="messages-container">
        {conversation.map((message, index) => {
          if (message.sender === 'ai') {
            return (
              <div key={index} className="message ai">
                {/* Render the AI's text as Markdown */}
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            );
          } else {
            // For user messages, we can keep it simple
            return (
              <div key={index} className="message user">
                <p>{message.text}</p>
              </div>
            );
          }
        })}


        {isTyping && (
          <div className="message ai">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatBotInterface;
