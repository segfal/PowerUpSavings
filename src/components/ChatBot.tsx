import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const chatVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      y: 100, 
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, x: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="chatbot-container">
      <AnimatePresence>
        {!isOpen && (
          <motion.button 
            className="chat-toggle"
            onClick={() => setIsOpen(true)}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            exit={{ opacity: 0, y: 100 }}
          >
            <motion.i 
              className="icon-chat"
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            Chat Advisor
          </motion.button>
        )}

        {isOpen && (
          <motion.div 
            className="chat-window"
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div 
              className="chat-header"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3>Financial Advisor</h3>
              <motion.button 
                className="close-button"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </motion.div>
            
            <div className="messages-container">
              <AnimatePresence>
                {messages.length === 0 && (
                  <motion.div 
                    className="welcome-message"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p>👋 Hi! I'm your AI financial advisor. I can help you make better spending decisions based on your transaction history.</p>
                    <p>Try asking about:</p>
                    <motion.ul
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: {
                          transition: {
                            staggerChildren: 0.1
                          }
                        }
                      }}
                    >
                      {['Food spending habits', 'Shopping patterns', 'Ways to save money'].map((item, index) => (
                        <motion.li
                          key={index}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                          }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                )}
                
                {messages.map(message => (
                  <motion.div 
                    key={message.id} 
                    className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    layout
                  >
                    {message.text}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
            
            <motion.form 
              onSubmit={handleSubmit} 
              className="chat-input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask for financial advice..."
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.1, backgroundColor: "var(--success-green)" }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="icon-send" />
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot; 