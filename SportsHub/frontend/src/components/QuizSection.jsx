import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Trophy, Clock, CheckCircle, XCircle,
  Play, ArrowRight, Star, Target, Award,
  Info, X, ChevronRight, RotateCcw, User
} from 'lucide-react';
import { quizService } from '../services/quizService.jsx';
import loginContext from '../context/loginContext.js';
import CustomToast from '../helper/CustomToast.jsx';

const QuizSection = ({ isDarkMode, preSelectedSport }) => {
  const { isLoggedIn, userType, checkAuthStatus } = useContext(loginContext);
  const [selectedSport, setSelectedSport] = useState(preSelectedSport || '');
  const [quizState, setQuizState] = useState('selection'); // selection, loading, quiz, results, nameInput
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [timer, setTimer] = useState(null);
  const [athleteName, setAthleteName] = useState('');
  const [isGuestUser, setIsGuestUser] = useState(false);

  const availableSports = [
    { name: 'Cricket', icon: '🏏', color: 'from-green-500 to-emerald-600' },
    { name: 'Football', icon: '⚽', color: 'from-blue-500 to-cyan-600' },
    { name: 'Basketball', icon: '🏀', color: 'from-orange-500 to-red-600' },
    { name: 'Tennis', icon: '🎾', color: 'from-yellow-500 to-orange-600' },
    { name: 'Chess', icon: '♟️', color: 'from-purple-500 to-indigo-600' }
  ];

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500 bg-green-500/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'hard': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const startQuiz = async () => {
    if (!selectedSport) {
      CustomToast({ message: 'Please select a sport first!', type: 'error' });
      return;
    }

    // Check authentication status for result submission only
    const isAuthenticated = checkAuthStatus ? checkAuthStatus() : isLoggedIn;
    setIsGuestUser(!isAuthenticated);
    setQuizState('loading');
    
    try {
      const response = await quizService.generateQuiz([selectedSport]);
      
      if (response.questions && response.questions.length > 0) {
        setQuestions(response.questions);
        setQuizState('quiz');
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setScore(0);
        setTimeLeft(30);
        setQuizCompleted(false);
        setQuizStartTime(new Date());
        startTimer();
      } else {
        CustomToast({ message: 'Questions are being generated and will be available soon. Please try again in a few minutes!', type: 'info' });
        setQuizState('selection');
      }
    } catch (error) {
      console.error('Error starting quiz:', error);
      
      // Handle the case where questions are being generated
      if (error.status === 'generating') {
        CustomToast({
          message: error.message || 'Questions are being generated and will be available soon. Please try again in a few minutes!',
          type: 'info'
        });
        
        // Show additional info if available
        if (error.info) {
          setTimeout(() => {
            CustomToast({
              message: error.info,
              type: 'info'
            });
          }, 2000);
        }
      } else {
        CustomToast({ message: 'Questions are being generated and will be available soon. Please try again in a few minutes!', type: 'info' });
      }
      
      setQuizState('selection');
    }
  };

  const startTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
    const newTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(newTimer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimer(newTimer);
  };

  const handleTimeUp = () => {
    if (!quizCompleted) {
      handleAnswerSubmit(''); // Submit empty answer for timeout
    }
  };

  const handleAnswerSubmit = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;
    
    const answerData = {
      questionId: currentQuestion._id,
      selectedAnswer: answer,
      correctAnswer: currentQuestion.correct_answer,
      isCorrect,
      timeTaken: 30 - timeLeft
    };

    setUserAnswers([...userAnswers, answerData]);
    setSelectedAnswer(answer);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowExplanation(true);
  };

  const nextQuestion = async () => {
    setShowExplanation(false);
    setSelectedAnswer('');
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
      startTimer();
    } else {
      // Clear timer
      if (timer) {
        clearInterval(timer);
      }
      
      // For guest users, show name input before results
      if (isGuestUser) {
        setQuizState('nameInput');
      } else {
        // Submit quiz results for logged-in users
        await submitQuizResults();
        setQuizState('results');
      }
      setQuizCompleted(true);
    }
  };

  const submitQuizResults = async () => {
    try {
      const token = localStorage.getItem('token');
      const quizEndTime = new Date();
      const totalTimeTaken = Math.floor((quizEndTime - quizStartTime) / 1000); // in seconds

      const quizData = {
        sport: selectedSport,
        questions: userAnswers,
        totalTimeTaken,
        ...(isGuestUser && { athleteName: athleteName || 'Anonymous Athlete' })
      };

      // Only submit to server if user is logged in
      if (!isGuestUser && token) {
        await quizService.submitQuizResult(quizData, token);
        CustomToast({ message: 'Quiz results saved successfully!', type: 'success' });
      } else if (isGuestUser) {
        CustomToast({ message: `Great job, ${athleteName || 'Athlete'}! Your quiz is complete.`, type: 'success' });
      }
    } catch (error) {
      console.error('Error submitting quiz results:', error);
      if (!isGuestUser) {
        CustomToast({ message: 'Failed to save quiz results', type: 'error' });
      }
    }
  };

  const handleNameSubmit = async () => {
    if (!athleteName.trim()) {
      CustomToast({ message: 'Please enter your name to continue!', type: 'error' });
      return;
    }
    
    // Submit quiz results with athlete name
    await submitQuizResults();
    setQuizState('results');
  };

  const resetQuiz = () => {
    // Clear timer
    if (timer) {
      clearInterval(timer);
    }
    
    setQuizState('selection');
    setSelectedSport('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setTimeLeft(30);
    setShowExplanation(false);
    setQuizCompleted(false);
    setQuizStartTime(null);
    setTimer(null);
    setAthleteName('');
    setIsGuestUser(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return { message: "Excellent! You're a sports expert! 🏆", color: "text-green-500" };
    if (percentage >= 60) return { message: "Good job! Keep learning! 👍", color: "text-blue-500" };
    if (percentage >= 40) return { message: "Not bad! Room for improvement! 📚", color: "text-yellow-500" };
    return { message: "Keep practicing! You'll get better! 💪", color: "text-red-500" };
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Sports <span className={`${
              isDarkMode 
                ? 'bg-gradient-to-r from-orange-400 to-red-500' 
                : 'bg-gradient-to-r from-blue-500 to-cyan-400'
            } bg-clip-text text-transparent`}>Quiz</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Test your sports knowledge with our AI-generated quiz featuring 10 questions across different difficulty levels
          </p>
        </motion.div>

        <div className={`${
          isDarkMode 
            ? 'bg-white/5 backdrop-blur-md border-white/10' 
            : 'bg-black/5 backdrop-blur-md border-black/10'
        } rounded-3xl border p-8 max-w-4xl mx-auto`}>
          
          <AnimatePresence mode="wait">
            {/* Sport Selection */}
            {quizState === 'selection' && (
              <motion.div
                key="selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <Brain className={`w-16 h-16 mx-auto mb-4 ${
                    isDarkMode ? 'text-orange-400' : 'text-blue-500'
                  }`} />
                  <h3 className="text-3xl font-bold mb-4">Choose Your Sport</h3>
                  <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Select a sport to start your 10-question quiz
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {availableSports.map((sport) => (
                    <motion.button
                      key={sport.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSport(sport.name)}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                        selectedSport === sport.name
                          ? `border-current bg-gradient-to-br ${sport.color} text-white`
                          : isDarkMode
                          ? 'border-white/20 hover:border-white/40 bg-white/5'
                          : 'border-black/20 hover:border-black/40 bg-black/5'
                      }`}
                    >
                      <div className="text-4xl mb-2">{sport.icon}</div>
                      <div className="font-semibold">{sport.name}</div>
                    </motion.button>
                  ))}
                </div>

                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startQuiz}
                    disabled={!selectedSport}
                    className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      selectedSport
                        ? isDarkMode
                          ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white'
                          : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white'
                        : 'bg-gray-500/20 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Play className="w-6 h-6" />
                    <span>Start Quiz</span>
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-green-500/10' : 'bg-green-500/10'}`}>
                    <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <div className="font-semibold text-green-500">4 Easy</div>
                    <div className="text-sm opacity-75">Basic questions</div>
                  </div>
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-yellow-500/10' : 'bg-yellow-500/10'}`}>
                    <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                    <div className="font-semibold text-yellow-500">3 Medium</div>
                    <div className="text-sm opacity-75">Moderate difficulty</div>
                  </div>
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-red-500/10' : 'bg-red-500/10'}`}>
                    <Award className="w-8 h-8 mx-auto mb-2 text-red-500" />
                    <div className="font-semibold text-red-500">3 Hard</div>
                    <div className="text-sm opacity-75">Expert level</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Loading State */}
            {quizState === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <div className={`w-16 h-16 mx-auto mb-6 border-4 border-t-transparent rounded-full animate-spin ${
                  isDarkMode ? 'border-orange-400' : 'border-blue-500'
                }`}></div>
                <h3 className="text-2xl font-bold mb-2">Generating Your Quiz...</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Preparing 10 questions about {selectedSport}
                </p>
              </motion.div>
            )}

            {/* Quiz Questions */}
            {quizState === 'quiz' && questions.length > 0 && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Quiz Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      getDifficultyColor(questions[currentQuestionIndex]?.difficulty)
                    }`}>
                      {questions[currentQuestionIndex]?.difficulty?.toUpperCase()}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span className={`font-mono text-lg ${
                      timeLeft <= 10 ? 'text-red-500' : isDarkMode ? 'text-orange-400' : 'text-blue-500'
                    }`}>
                      {timeLeft}s
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      isDarkMode ? 'bg-orange-400' : 'bg-blue-500'
                    }`}
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>

                {/* Question */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-6">
                    {questions[currentQuestionIndex]?.question_text}
                  </h3>
                </div>

                {/* Answer Options */}
                {!showExplanation && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {questions[currentQuestionIndex]?.options?.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswerSubmit(option)}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                          isDarkMode
                            ? 'border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10'
                            : 'border-black/20 hover:border-black/40 bg-black/5 hover:bg-black/10'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
                            isDarkMode ? 'border-white/40' : 'border-black/40'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="font-medium">{option}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Explanation Modal */}
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-6 rounded-2xl border ${
                      userAnswers[userAnswers.length - 1]?.isCorrect
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-red-500/10 border-red-500/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      {userAnswers[userAnswers.length - 1]?.isCorrect ? (
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-500" />
                      )}
                      <h4 className="text-xl font-bold">
                        {userAnswers[userAnswers.length - 1]?.isCorrect ? 'Correct!' : 'Incorrect!'}
                      </h4>
                    </div>
                    
                    {!userAnswers[userAnswers.length - 1]?.isCorrect && (
                      <p className="mb-3">
                        <span className="font-semibold">Correct Answer: </span>
                        {questions[currentQuestionIndex]?.correct_answer}
                      </p>
                    )}
                    
                    <div className="flex items-start space-x-2 mb-4">
                      <Info className="w-5 h-5 mt-0.5 text-blue-500" />
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                        {questions[currentQuestionIndex]?.explanation}
                      </p>
                    </div>

                    <button
                      onClick={nextQuestion}
                      className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        isDarkMode
                          ? 'bg-orange-500 hover:bg-orange-600 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      <span>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Name Input for Guest Users */}
            {quizState === 'nameInput' && (
              <motion.div
                key="nameInput"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-8"
              >
                <div>
                  <User className={`w-16 h-16 mx-auto mb-6 ${
                    isDarkMode ? 'text-orange-400' : 'text-blue-500'
                  }`} />
                  <h3 className="text-3xl font-bold mb-4">Almost Done!</h3>
                  <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Please enter your name to complete the quiz as an athlete
                  </p>
                </div>

                <div className="max-w-md mx-auto">
                  <input
                    type="text"
                    value={athleteName}
                    onChange={(e) => setAthleteName(e.target.value)}
                    placeholder="Enter your name (e.g., Athlete)"
                    className={`w-full px-4 py-3 rounded-xl border-2 text-lg font-medium transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-orange-400'
                        : 'bg-black/5 border-black/20 text-black placeholder-gray-500 focus:border-blue-500'
                    } focus:outline-none`}
                    onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNameSubmit}
                  className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
                  } text-white`}
                >
                  <Trophy className="w-6 h-6" />
                  <span>View Results</span>
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </motion.div>
            )}

            {/* Results */}
            {quizState === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-8"
              >
                <div>
                  <Trophy className={`w-20 h-20 mx-auto mb-6 ${
                    score >= questions.length * 0.8 ? 'text-yellow-500' :
                    score >= questions.length * 0.6 ? 'text-blue-500' : 'text-gray-500'
                  }`} />
                  <h3 className="text-4xl font-bold mb-4">
                    {isGuestUser ? `Great job, ${athleteName || 'Athlete'}!` : 'Quiz Complete!'}
                  </h3>
                  <div className="text-6xl font-bold mb-4">
                    <span className={isDarkMode ? 'text-orange-400' : 'text-blue-500'}>
                      {score}
                    </span>
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      /{questions.length}
                    </span>
                  </div>
                  <p className={`text-xl ${getScoreMessage().color}`}>
                    {getScoreMessage().message}
                  </p>
                  {isGuestUser && (
                    <p className={`text-lg mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Thanks for participating as an athlete! 🏃‍♂️
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                    <div className="text-2xl font-bold text-green-500">{score}</div>
                    <div className="text-sm opacity-75">Correct</div>
                  </div>
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                    <div className="text-2xl font-bold text-red-500">{questions.length - score}</div>
                    <div className="text-sm opacity-75">Incorrect</div>
                  </div>
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                    <div className={`text-2xl font-bold ${isDarkMode ? 'text-orange-400' : 'text-blue-500'}`}>
                      {Math.round((score / questions.length) * 100)}%
                    </div>
                    <div className="text-sm opacity-75">Score</div>
                  </div>
                </div>

                <button
                  onClick={resetQuiz}
                  className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
                  } text-white`}
                >
                  <RotateCcw className="w-6 h-6" />
                  <span>Take Another Quiz</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;