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
      // Handle the error gracefully:
      console.error('Error fetching AI response:', error);
      // Optionally display an error message in the chat:
      setConversation((conv) => [
        ...conv,
        {
          sender: 'ai',
          text: 'Sorry, I encountered an error. Please try again later.',
        },
      ]);
    } finally {
      // Always clear typing state
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
          type="text"
          value={input}
          onChange={handleInputChange}
          className="chat-bot-search-input"
          placeholder="Ask your questions here..."
        />
        <button type="submit" className="chat-bot-search-button">
          Ask
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
