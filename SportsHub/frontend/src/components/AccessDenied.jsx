import { motion } from "motion/react";
import {
  AlertCircle,
  Lock,
  Home,
  ArrowLeft
} from 'lucide-react';
const AccessDenied = ({isDarkMode}) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen pt-20 flex items-center justify-center"
    >
      <div className="max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-8 rounded-2xl text-center ${
            isDarkMode
              ? 'bg-white/5 backdrop-blur-md border-white/10'
              : 'bg-black/5 backdrop-blur-md border-black/10'
          } border`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              isDarkMode
                ? 'bg-red-500/20 border-2 border-red-500/30'
                : 'bg-red-500/20 border-2 border-red-500/30'
            }`}
          >
            <Lock className="w-10 h-10 text-red-500" />
          </motion.div>
          
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          
          <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            You don't have permission to access the admin dashboard.
          </p>
          
          <div className={`p-4 rounded-xl mb-6 ${
            isDarkMode ? 'bg-red-500/10' : 'bg-red-500/10'
          }`}>
            <div className="flex items-center justify-center space-x-2 text-red-500">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Administrator privileges required</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isDarkMode
                  ? 'bg-orange-500 hover:bg-orange-400 text-white'
                  : 'bg-blue-500 hover:bg-blue-400 text-white'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                isDarkMode
                  ? 'bg-white/10 hover:bg-white/20 text-gray-300'
                  : 'bg-black/10 hover:bg-black/20 text-gray-700'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Return Home</span>
            </button>
          </div>
        </motion.div>
        
        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mt-6 p-4 rounded-xl ${
            isDarkMode ? 'bg-white/5' : 'bg-black/5'
          }`}
        >
          <p className={`text-sm text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Need admin access? Contact your system administrator or support team.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );

  export default AccessDenied;