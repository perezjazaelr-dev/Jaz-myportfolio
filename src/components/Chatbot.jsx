import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi there! I'm Jazael's AI Assistant. How can I help you today?\n\nHere are some quick questions you can ask me:\n\n-- >> Who Is Jazael Remuel Perez\n-- >> Services And Tech Stack\n-- >> How To Contact"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const userMessage = typeof text === 'string' ? text : input;
    if (!userMessage.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');

    const lowerMessage = userMessage.toLowerCase().trim();
    const faqResponses = {
      'who is jazael remuel perez': `Jazael Remuel Perez is a **Filipino full-stack and junior web developer** based in Metro Manila, Philippines.\n\nHe is known for building localized digital management tools and youth portals, such as the **SK Namayan Youth Portal** and its integrated system tracking applications like the Namayan Digital Registry.\n\n**Background & Professional Experience**\n\n- **Education:** He pursued a Bachelor of Science in Information Technology at **Rizal Technological University (RTU)**.\n- **Web Development:** He built and engineered the full-stack architecture for **SK Namayan**, configuring its user portals, tracking systems, and *SKonsulta* programs.\n- **Prior Internships:** He previously accumulated corporate and tech experience as an IT intern at companies like **Microgenesis** and **HousingInteractive**.\n\nAre you looking for more details regarding his **software projects**, or do you need to connect with him for a **professional / development collaboration**?`,
      'services and tech stack': `Jazael offers a wide range of digital services including full-stack web development, frontend design, and database management.\n\n**Core Tech Stack:**\n- **Frontend:** React, Next.js, Tailwind CSS, TypeScript\n- **Backend:** PHP, Python, Laravel\n\nWhether you need a sleek landing page or a complex web portal, he's got you covered!`,
      'how to contact': `You can easily reach out to Jazael through the following channels:\n\n- **Email:** perezjazaelr@gmail.com\n- **LinkedIn:** [Visit Profile](#)\n- **GitHub:** [View Repositories](#)\n\nFeel free to send a message for collaborations or inquiries!`
    };

    if (faqResponses[lowerMessage]) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: faqResponses[lowerMessage] }]);
        setIsTyping(false);
      }, 500); // 0.5s delay to feel natural and show the new typing dots!
      return;
    }

    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");
      
      setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      console.error("Chat error", error);
      let errorMsg = "Sorry, I ran into an error connecting to my AI brain. Please try again later!";
      if (error.message.includes('503') || error.message.includes('429')) {
        errorMsg = "I'm currently experiencing a very high volume of requests! While my AI brain cools down, please feel free to reach out to Jazael directly at **perezjazaelr@gmail.com**.";
      }
      setMessages(prev => [...prev, { sender: 'bot', text: errorMsg }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button className="chatbot-fab" onClick={() => setIsOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              className="chatbot-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              className="chatbot-panel"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="chatbot-header">
                <h3>Jazael's AI Assistant</h3>
                <button onClick={() => setIsOpen(false)}>&times;</button>
              </div>
              
              <div className="chatbot-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`chat-bubble ${msg.sender}`}>
                    {msg.sender === 'user' ? (
                      <p>{msg.text}</p>
                    ) : msg.text.includes('-- >>') ? (
                      msg.text.split('\n').map((line, j) => {
                        if (line.startsWith('-- >>')) {
                          const btnText = line.replace('-- >> ', '');
                          return <button key={j} className="faq-btn" onClick={() => handleSend(btnText)}>{btnText}</button>
                        }
                        return <p key={j}>{line}</p>
                      })
                    ) : (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="chat-bubble bot typing">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="chatbot-input">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
                <button onClick={() => handleSend()} disabled={isTyping}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
