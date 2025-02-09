import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./SpendingGame.css";
import transactionData from '../../backend/transactions.json';

type Transaction = {
  id: string;
  created_at: string;
  merchant: string;
  category: string;
  product: string;
  amount: number;
  customer_id: string;
  account_id: string;
  status: string;
  type: string;
  description: string;
};

type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
  amount: number;
};

const SpendingGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (gameStarted) {
      try {
        generateQuestions();
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load questions. Please try again.");
        setIsLoading(false);
      }
    }
  }, [gameStarted]);

  const generateQuestions = () => {
    try {
      const transactions = transactionData.transactions as Transaction[];
      if (!Array.isArray(transactions) || transactions.length === 0) {
        throw new Error("No transaction data available");
      }

      const generatedQuestions: Question[] = [
        {
          id: '1',
          text: "Which category did you spend the most on this month?",
          options: Array.from(new Set(transactions.map(t => t.category))),
          correctAnswer: findHighestSpendingCategory(transactions),
          explanation: "Understanding where most of your money goes helps in better budgeting!",
          category: "spending_pattern",
          amount: 0
        },
        {
          id: '2',
          text: "How much did you spend on fast food this month?",
          options: generateAmountOptions(calculateCategoryTotal(transactions, "fast_food")),
          correctAnswer: `$${calculateCategoryTotal(transactions, "fast_food").toFixed(2)}`,
          explanation: "Tracking food expenses can help identify potential savings!",
          category: "fast_food",
          amount: calculateCategoryTotal(transactions, "fast_food")
        },
        {
          id: '3',
          text: "True or False: You spent more on entertainment than groceries?",
          options: ["True", "False"],
          correctAnswer: compareCategories(transactions, "entertainment", "grocery") ? "True" : "False",
          explanation: "Balancing essential and leisure spending is key to financial health!",
          category: "comparison",
          amount: 0
        },
        {
          id: '4',
          text: "What percentage of your total spending was on subscriptions?",
          options: generatePercentageOptions(calculateCategoryPercentage(transactions, "subscription")),
          correctAnswer: `${calculateCategoryPercentage(transactions, "subscription").toFixed(0)}%`,
          explanation: "Subscription costs can add up quickly without us noticing!",
          category: "subscription",
          amount: calculateCategoryTotal(transactions, "subscription")
        },
        {
          id: '5',
          text: "Which day of the week do you tend to spend the most?",
          options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          correctAnswer: findHighestSpendingDay(transactions),
          explanation: "Being aware of spending patterns can help in planning better!",
          category: "timing",
          amount: 0
        }
      ];

      setQuestions(generatedQuestions);
    } catch (err) {
      setError("Failed to generate questions. Please try again.");
      console.error("Error generating questions:", err);
    }
  };

  const findHighestSpendingCategory = (transactions: Transaction[]) => {
    const categoryTotals = transactions.reduce((acc: Record<string, number>, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    return Object.entries(categoryTotals)
      .sort(([,a], [,b]) => b - a)[0][0];
  };

  const calculateCategoryTotal = (transactions: Transaction[], category: string) => {
    return transactions
      .filter(t => t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const calculateCategoryPercentage = (transactions: Transaction[], category: string) => {
    const categoryTotal = calculateCategoryTotal(transactions, category);
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    return (categoryTotal / total) * 100;
  };

  const compareCategories = (transactions: Transaction[], cat1: string, cat2: string) => {
    const total1 = calculateCategoryTotal(transactions, cat1);
    const total2 = calculateCategoryTotal(transactions, cat2);
    return total1 > total2;
  };

  const findHighestSpendingDay = (transactions: Transaction[]) => {
    const dayTotals = transactions.reduce((acc: Record<string, number>, t) => {
      const day = new Date(t.created_at).getDay();
      acc[day.toString()] = (acc[day.toString()] || 0) + t.amount;
      return acc;
    }, {});
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const highestDay = Object.entries(dayTotals)
      .sort(([,a], [,b]) => b - a)[0][0];
    return days[parseInt(highestDay)];
  };

  const generateAmountOptions = (correctAmount: number) => {
    const options = [correctAmount];
    for (let i = 0; i < 3; i++) {
      const variation = correctAmount * (0.5 + Math.random());
      options.push(variation);
    }
    return options
      .sort(() => Math.random() - 0.5)
      .map(amount => `$${amount.toFixed(2)}`);
  };

  const generatePercentageOptions = (correctPercentage: number) => {
    const options = [correctPercentage];
    for (let i = 0; i < 3; i++) {
      const variation = correctPercentage * (0.5 + Math.random());
      options.push(variation);
    }
    return options
      .sort(() => Math.random() - 0.5)
      .map(percent => `${percent.toFixed(0)}%`);
  };

  const handleAnswer = (selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setGameFinished(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowFeedback(false);
    setGameFinished(false);
    setQuestions([]);
    setIsLoading(true);
    setError(null);
  };

  const generateSpendingInsights = (transactions: Transaction[]) => {
    const totalSpending = transactions.reduce((sum, t) => sum + t.amount, 0);
    const categoryTotals = transactions.reduce((acc: Record<string, number>, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    
    const sortedCategories = Object.entries(categoryTotals)
      .sort(([,a], [,b]) => b - a)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: (amount / totalSpending) * 100
      }));

    const dayTotals = transactions.reduce((acc: Record<string, number>, t) => {
      const day = new Date(t.created_at).toLocaleDateString('en-US', { weekday: 'long' });
      acc[day] = (acc[day] || 0) + t.amount;
      return acc;
    }, {});

    return {
      totalSpending,
      topCategories: sortedCategories.slice(0, 3),
      lowestCategories: sortedCategories.slice(-3),
      dailySpending: dayTotals,
      subscriptionTotal: categoryTotals['subscription'] || 0,
      foodTotal: (categoryTotals['fast_food'] || 0) + (categoryTotals['grocery'] || 0),
      entertainmentTotal: categoryTotals['entertainment'] || 0
    };
  };

  if (error) {
    return (
      <main className="main-content">
        <div className="spending-game-container">
          <div className="game-content">
            <div className="retro-card error">
              <h2>Oops! Something went wrong</h2>
              <p>{error}</p>
              <button 
                className="play-again-button"
                onClick={resetGame}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!gameStarted) {
    return (
      <main className="main-content">
        <div className="spending-game-container">
          <div className="pixel-art-decorations">
            <div className="pixel-coin left-coin"></div>
            <div className="pixel-coin right-coin"></div>
            <div className="pixel-wallet left-wallet"></div>
            <div className="pixel-wallet right-wallet"></div>
            <div className="pixel-chart top-chart"></div>
            <div className="pixel-chart bottom-chart"></div>
          </div>
          <div className="game-content">
            <h1 className="retro-title">Did You Buy That? 🤔</h1>
            <div className="retro-card">
              <div className="card-content">
                <h2>Test Your Spending Awareness!</h2>
                <p>Think you know where your money goes? Let's find out! Answer questions about your spending habits and see how aware you are of your financial choices.</p>
                <button 
                  className="enter-button"
                  onClick={() => setGameStarted(true)}
                >
                  START QUIZ
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="main-content">
        <div className="spending-game-container">
          <div className="game-content">
            <div className="retro-card">
              <div className="card-content">
                <h2>Loading Quiz...</h2>
                <p>Getting your spending data ready!</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (gameFinished) {
    const insights = generateSpendingInsights(transactionData.transactions as Transaction[]);
    
    return (
      <main className="main-content">
        <div className="spending-game-container">
          <div className="game-content">
            <div className="retro-card results">
              <h2>Quiz Complete! 🎉</h2>
              <div className="score-display">
                <span className="score-text">Your Score:</span>
                <span className="final-score">{score}/{questions.length}</span>
              </div>
              <p className="score-message">
                {score === questions.length ? "Perfect! You're very aware of your spending habits!" :
                 score >= questions.length * 0.7 ? "Great job! You're quite aware of your finances!" :
                 score >= questions.length * 0.5 ? "Not bad! But there's room for improvement." :
                 "Time to pay more attention to your spending habits!"}
              </p>

              <div className="insights-section">
                <h3>Your Spending Insights 📊</h3>
                
                <div className="insight-card total">
                  <h4>Total Monthly Spending</h4>
                  <div className="amount">${insights.totalSpending.toFixed(2)}</div>
                </div>

                <div className="insight-card categories">
                  <h4>Top Spending Categories</h4>
                  <div className="category-list">
                    {insights.topCategories.map((cat) => (
                      <div key={cat.category} className="category-item">
                        <span className="category-name">{cat.category.replace('_', ' ')}</span>
                        <div className="category-bar-container">
                          <div 
                            className="category-bar"
                            style={{ width: `${cat.percentage}%` }}
                          />
                        </div>
                        <span className="category-amount">${cat.amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="insight-card spending-patterns">
                  <h4>Spending Patterns</h4>
                  <div className="pattern-grid">
                    <div className="pattern-item">
                      <span className="label">Subscription Costs</span>
                      <span className="value">${insights.subscriptionTotal.toFixed(2)}/month</span>
                    </div>
                    <div className="pattern-item">
                      <span className="label">Food Expenses</span>
                      <span className="value">${insights.foodTotal.toFixed(2)}</span>
                    </div>
                    <div className="pattern-item">
                      <span className="label">Entertainment</span>
                      <span className="value">${insights.entertainmentTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="insight-card recommendations">
                  <h4>Recommendations 💡</h4>
                  <ul className="recommendations-list">
                    {insights.subscriptionTotal > insights.totalSpending * 0.1 && (
                      <li>Consider reviewing your subscription services - they make up more than 10% of your spending.</li>
                    )}
                    {insights.foodTotal > insights.totalSpending * 0.3 && (
                      <li>Your food expenses are significant. Try meal planning to reduce costs.</li>
                    )}
                    {insights.entertainmentTotal > insights.totalSpending * 0.2 && (
                      <li>Look for free or lower-cost entertainment alternatives to save money.</li>
                    )}
                    <li>Set up budget alerts for your top spending categories.</li>
                    <li>Track your daily expenses to stay within your budget.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!questions || questions.length === 0 || !questions[currentQuestionIndex]) {
    return (
      <main className="main-content">
        <div className="spending-game-container">
          <div className="game-content">
            <div className="retro-card error">
              <h2>No Questions Available</h2>
              <p>Unable to load quiz questions. Please try again.</p>
              <button 
                className="play-again-button"
                onClick={resetGame}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="spending-game-container">
        <div className="game-content">
          <div className="retro-card quiz-active">
            <div className="quiz-progress">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <h2 className="question-text">{questions[currentQuestionIndex].text}</h2>
            <div className="options-grid">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <motion.button
                  key={index}
                  className="option-button"
                  onClick={() => handleAnswer(option)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={showFeedback}
                >
                  {option}
                </motion.button>
              ))}
            </div>
            {showFeedback && (
              <motion.div 
                className={`feedback-box ${isCorrect ? 'correct' : 'incorrect'}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <p>{isCorrect ? "Correct! 🎉" : "Not quite... 🤔"}</p>
                <p className="explanation">{questions[currentQuestionIndex].explanation}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SpendingGame; 