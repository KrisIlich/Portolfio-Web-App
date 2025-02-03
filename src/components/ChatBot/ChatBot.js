// ChatBot.js
import React, { useState, useEffect } from 'react';
import ChatBotInterface from './ChatBotInterface';
import { fetchChatGPTResponse } from '../../utils/fetchGPTResponse';
import './ChatBot.css';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Initial AI greeting
    setConversation([
      {
        sender: 'ai',
        text: 'Ask me anything about Kristopher, I am his personal assistant powered by AI.',
      },
    ]);
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // New: Handle keyDown to detect Enter key
  const handleKeyDown = (e) => {
    // If Enter is pressed without Shift (allowing Shift+Enter for newline)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent newline insertion
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent empty submissions

    const userMessage = { sender: 'user', text: input };
    setConversation((conv) => [...conv, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Fetch AI response from your utility function
      const aiText = await fetchChatGPTResponse(input);
      const aiResponse = { sender: 'ai', text: aiText };
      setConversation((conv) => [...conv, aiResponse]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setConversation((conv) => [
        ...conv,
        {
          sender: 'ai',
          text: 'Sorry, I encountered an error. Please try again later.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-bot-container">
      <h1 className="chat-bot-title" />

      {conversation.length > 0 && (
        <ChatBotInterface conversation={conversation} isTyping={isTyping} />
      )}

      <form onSubmit={handleSubmit} className="chat-bot-search-form">
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}  // Added keyDown handler
          className="chat-bot-search-input"
          placeholder="Ask your questions here..."
          style={{ fontSize: '16px' }} // Ensure font-size is 16px or above to prevent zoom
        />
        <button type="submit" className="chat-bot-search-button">
          Ask
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
