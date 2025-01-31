import React, {useState, useEffect} from 'react';
import '../../assets/styles/TankTalkerAIPage.css'
import Header from "../shared/Header";
import TankTalkerInterface from './TankTalkerInterface';
import axios from "axios";
import {fetchChatGPTResponse} from "../../utils/fetchGPTRepsonse";

const TankTalkerAIPage = () => {
    const [input, setInput] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    //function for adding a message to the messages array
    /*const addMessagetToConversation = (message) => {
        setConversation(prevConvo => [...[prevConvo, message]])
    }*/

    useEffect(() => {
        setConversation([{ sender: 'ai', text: 'Ask me anything about Kristopher, I am his personal assistant powered by AI.'}]);
    }, [])

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userMessage = {sender: 'user', text: input};
        setConversation(conv => [...conv, userMessage])
        setInput('');
        setIsTyping(true);

        const aiText = await fetchChatGPTResponse(input);
        const aiResponse = { sender: 'ai', text: aiText };
        setConversation(conv => [...conv, aiResponse])
        setIsTyping(false);

    };

    return (
        <div className={"ai-page"}>
            <div className={"ai-header"}>
            <Header/>
            </div>
        <div className={"tanktalker-ai-page"}>
            <h1 className={"tanktalker-title"}>AI Personal Assistant</h1>
            <form onSubmit={handleSubmit} className={"tanktalker-search-form"}>
                <input type={"text"} value={input} onChange={handleInputChange} className={"tanktalker-search-input"} placeholder={"Ask your aquarium-related questions here..."}/>
                <button type={"submit"} className={"tanktalker-search-button"}>Ask</button>
            </form>
            {conversation.length > 0 && (<TankTalkerInterface conversation={conversation} isTyping={isTyping} />
                )}
        </div>
        </div>
    );
};

export default TankTalkerAIPage;