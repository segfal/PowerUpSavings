import { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Transaction {
  receiver: string;
  type: string;
  amount: number;
}

interface ChatBotProps {
  transactions: Transaction[];
}

const ChatBot = ({ transactions }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeFastFoodSpending = () => {
    const fastFoodTransactions = transactions.filter(t => 
      t.receiver.toLowerCase().includes('mcdonalds') || 
      t.receiver.toLowerCase().includes('dunkin')
    );
    const totalSpent = fastFoodTransactions.reduce((sum, t) => sum + t.amount, 0);
    return totalSpent > 10 ? {
      issue: 'high fast food spending',
      suggestion: 'I notice you spend quite a bit on fast food. Have you considered meal prep services like HelloFresh? They often have great intro discounts, and it could help you save money while eating healthier!'
    } : null;
  };

  const analyzeLocalShopping = () => {
    const localStores = transactions.filter(t => 
      !t.receiver.toLowerCase().includes('amazon') &&
      t.type === 'Shopping'
    );
    return localStores.length > 2 ? {
      positive: true,
      message: 'Great job supporting local businesses! Did you know you earn 2x points at local stores? Keep it up!'
    } : null;
  };

  const generateResponse = (userMessage: string) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('food') || msg.includes('eating')) {
      const foodAnalysis = analyzeFastFoodSpending();
      return foodAnalysis?.suggestion || "Your food spending looks good! Keep making smart choices! Just be sure not to eat fast food everyday. Try to cook at home for healthier meals and less expensive as well. Check out our groceries menu on shopping better food sources";
    }
    
    if (msg.includes('shop') || msg.includes('store') && !msg.includes('help')) {
      const shoppingAnalysis = analyzeLocalShopping();
      return shoppingAnalysis?.message || "I can help you find the best deals at local stores! Check out our groceries menu on shopping better food sources";
    }
    if (msg.includes('help') || msg.includes('advice')) {
      return "I can help you analyze your spending patterns and suggest ways to save. Try asking about food spending or shopping habits!";
    }

    return "I'm here to help you make better financial decisions! Ask me about your spending habits or how to save more.";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button 
          className="chat-toggle"
          onClick={() => setIsOpen(true)}
        >
          <i className="icon-chat"></i>
          Chat Advisor
        </button>
      )}
      
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Financial Advisor</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
          
          <div className="messages-container">
            {messages.length === 0 && (
              <div className="welcome-message">
                <p>👋 Hi! I'm your AI financial advisor. I can help you make better spending decisions based on your transaction history.</p>
                <p>Try asking about:</p>
                <ul>
                  <li>Food spending habits</li>
                  <li>Shopping patterns</li>
                  <li>Ways to save money</li>
                </ul>
              </div>
            )}
            
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="chat-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask for financial advice..."
            />
            <button type="submit">
              <i className="icon-send"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 