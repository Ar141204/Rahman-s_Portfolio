import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { CloseIcon, SendIcon } from './Icons';
import { GoogleGenAI, Chat } from '@google/genai';
import { EXPERIENCES, EDUCATION, PROJECTS, SKILLS, INTERESTS, CERTIFICATIONS } from '../constants';

interface AIAssistantProps {
  onClose: () => void;
}

interface Message {
  role: 'user' | 'model';
  content: string;
}

const createSystemPrompt = (): string => {
    const portfolioData = `
# Abdul Rahman M's Portfolio Data

## About
A software engineering student with a passion for AI & ML and Full-Stack Development. Specializes in creating innovative solutions and enjoys tackling complex challenges to build impactful technology.

## Experience
${EXPERIENCES.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description}`).join('\n')}

## Education
${EDUCATION.map(e => `- ${e.degree} from ${e.institution} (${e.period}). ${e.details}`).join('\n')}

## Projects
${PROJECTS.map(p => `- ${p.name}: ${p.description} [Stack: ${p.stack.join(', ')}]`).join('\n')}

## Skills
- Languages: ${SKILLS.languages.join(', ')}
- Frameworks/Libraries: ${SKILLS.frameworks_libraries.join(', ')}
- Databases: ${SKILLS.databases.join(', ')}
- Tools/Platforms: ${SKILLS.tools.join(', ')}

## Certifications
${CERTIFICATIONS.map(c => `- ${c.name} from ${c.issuer}`).join('\n')}

## Interests
${INTERESTS.join(', ')}
`;

    return `You are a helpful and professional AI assistant for Abdul Rahman M's personal portfolio. Your goal is to answer questions about him based ONLY on the information provided below. Do not make up any information. If a question cannot be answered with the given context, politely say that you don't have that information. Keep your answers concise and to the point. Start the conversation by introducing yourself and asking how you can help.

${portfolioData}
`;
};


const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        const chatSession = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
              systemInstruction: createSystemPrompt(),
            },
        });
        setChat(chatSession);

        const savedMessagesRaw = sessionStorage.getItem('ai-chat-history');
        if (savedMessagesRaw) {
            const savedMessages = JSON.parse(savedMessagesRaw);
            if (savedMessages.length > 0) {
                setMessages(savedMessages);
                setIsLoading(false);
                return;
            }
        }

        const responseStream = await chatSession.sendMessageStream({ message: "Hello" });
        setIsLoading(true);
        setMessages([{ role: 'model', content: '' }]);
        for await (const chunk of responseStream) {
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content += chunk.text;
                return newMessages;
            });
        }
      } catch (error) {
          console.error("AI Assistant initialization failed:", error);
          setMessages([{ role: 'model', content: "Sorry, the AI assistant failed to initialize. Please try again later." }]);
      } finally {
          setIsLoading(false);
      }
    };
    initializeChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if(messages.length > 0) {
        sessionStorage.setItem('ai-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chat) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      setMessages(prev => [...prev, { role: 'model', content: '' }]);
      const responseStream = await chat.sendMessageStream({ message: currentInput });
      for await (const chunk of responseStream) {
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].content += chunk.text;
            return newMessages;
        });
      }
    } catch (error) {
        console.error("AI chat error:", error);
        const errorMessage: Message = { role: 'model', content: "Sorry, something went wrong. Please try again." };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="assistant-modal-overlay" onClick={onClose}>
      <div className="assistant-modal" onClick={(e) => e.stopPropagation()}>
        <div className="assistant-header">
          <span>AI Assistant</span>
          <button onClick={onClose} aria-label="Close assistant">
            <CloseIcon className="w-6 h-6 hover:text-[var(--accent-color)] transition-colors" />
          </button>
        </div>
        <div className="assistant-body">
            {messages.map((msg, index) => (
              <div key={index} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={msg.role === 'user' ? 'user-message' : 'model-message'}>
                    {msg.content}
                    {isLoading && index === messages.length -1 && msg.role === 'model' && <span className="blinking-cursor !h-4 !w-2"></span>}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex w-full justify-start">
                <div className="thinking-indicator">
                  <span>AI is thinking...</span>
                  <span className="blinking-cursor !h-4 !w-2"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
        </div>
        <form className="assistant-footer" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Ask about my projects..." 
            className="assistant-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            autoFocus
          />
          <button type="submit" className="assistant-send-btn" disabled={isLoading || !input.trim()}>
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;