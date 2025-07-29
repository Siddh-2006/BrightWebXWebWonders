import { useState, useEffect } from 'react';
import reminderService from '../services/reminderService';

const useReminder = (match) => {
  const [reminder, setReminder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeReminders, setActiveReminders] = useState([]);

  // Load existing reminders on mount
  useEffect(() => {
    loadActiveReminders();
  }, []);

  // Listen for custom reminder events
  useEffect(() => {
    const handleReminderEvent = (event) => {
      const { match: reminderMatch, minutes, message } = event.detail;
      
      // Show a custom toast or alert for the reminder
      console.log('🔔 Reminder triggered:', message);
      
      // You can dispatch this to a toast system or show a modal
      // For now, we'll just update the active reminders
      loadActiveReminders();
    };

    window.addEventListener('sportsHubReminder', handleReminderEvent);
    
    return () => {
      window.removeEventListener('sportsHubReminder', handleReminderEvent);
    };
  }, []);

  const loadActiveReminders = () => {
    const reminders = reminderService.getAllReminders();
    setActiveReminders(reminders);
    
    // Check if current match has a reminder
    if (match) {
      const matchKey = `${match.homeTeam}-${match.awayTeam}-${match.date}`;
      const currentReminder = reminders.find(r => r.matchKey === matchKey);
      if (currentReminder) {
        setReminder(currentReminder.minutes);
      }
    }
  };

  const handleSetReminder = (minutes) => {
    const result = reminderService.scheduleReminder(match, minutes);
    
    if (result.success) {
      setReminder(minutes);
      loadActiveReminders();
      return result;
    } else {
      console.error('Failed to set reminder:', result.message);
      return result;
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const clearReminder = () => {
    if (match) {
      const matchKey = `${match.homeTeam}-${match.awayTeam}-${match.date}`;
      reminderService.clearReminder(matchKey);
      setReminder(null);
      loadActiveReminders();
    }
  };

  return {
    reminder,
    setReminder: handleSetReminder,
    isModalOpen,
    openModal,
    closeModal,
    activeReminders,
    clearReminder,
  };
};

export default useReminder;