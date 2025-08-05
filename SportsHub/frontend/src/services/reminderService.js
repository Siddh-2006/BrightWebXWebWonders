class ReminderService {
  constructor() {
    this.reminders = new Map();
    this.requestNotificationPermission();
  }

  async requestNotificationPermission() {
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        await Notification.requestPermission();
      }
    }
  }

  scheduleReminder(match, minutes) {
    try {
      // Clear any existing reminder for this match
      const matchKey = `${match.homeTeam}-${match.awayTeam}-${match.date}`;
      this.clearReminder(matchKey);

      // Calculate notification time
      const now = new Date().getTime();
      const [hours, mins] = match.time.split(':');
      const matchDate = new Date(match.date);
      matchDate.setHours(parseInt(hours), parseInt(mins), 0, 0);
      const matchTime = matchDate.getTime();
      const notificationTime = matchTime - minutes * 60 * 1000;

      if (notificationTime <= now) {
        throw new Error('Reminder time has already passed');
      }

      // Check notification support and permission
      const canShowNotifications = this.canShowNotifications();
      
      // Schedule the reminder (works with or without notifications)
      const timeoutId = setTimeout(() => {
        if (canShowNotifications) {
          this.showNotification(match, minutes);
        } else {
          // Fallback: show in-app alert or console message
          this.showFallbackReminder(match, minutes);
        }
        this.reminders.delete(matchKey);
        this.saveToLocalStorage();
      }, notificationTime - now);

      // Store the reminder
      const reminder = {
        matchKey,
        match,
        minutes,
        timeoutId,
        scheduledFor: new Date(notificationTime),
        createdAt: new Date(),
        hasNotificationPermission: canShowNotifications
      };

      this.reminders.set(matchKey, reminder);

      // Store in localStorage for persistence
      this.saveToLocalStorage();

      let message = `Reminder set for ${minutes} minutes before the match`;
      if (!canShowNotifications) {
        message += ' (Browser notifications disabled - reminder will show in app)';
      }

      return {
        success: true,
        message,
        scheduledFor: new Date(notificationTime),
        hasNotificationPermission: canShowNotifications
      };

    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  canShowNotifications() {
    return (
      'Notification' in window &&
      Notification.permission === 'granted'
    );
  }

  showNotification(match, minutes) {
    const notification = new Notification(
      `⚽ Match Reminder: ${match.homeTeam} vs ${match.awayTeam}`,
      {
        body: `The match starts in ${minutes} minutes! Don't miss it!`,
        icon: '/ball.png',
        badge: '/ball.png',
        tag: `match-${match.homeTeam}-${match.awayTeam}`,
        requireInteraction: true,
        actions: [
          {
            action: 'view',
            title: 'View Match'
          },
          {
            action: 'dismiss',
            title: 'Dismiss'
          }
        ]
      }
    );

    notification.onclick = () => {
      window.focus();
      notification.close();
      // You can add navigation logic here
    };

    // Auto-close after 10 seconds
    setTimeout(() => {
      notification.close();
    }, 10000);
  }

  showFallbackReminder(match, minutes) {
    // Create a custom in-app notification
    const reminderMessage = `⚽ Match Reminder: ${match.homeTeam} vs ${match.awayTeam}\nThe match starts in ${minutes} minutes! Don't miss it!`;
    
    // Log to console for debugging

    // Dispatch a custom event that components can listen to
    window.dispatchEvent(new CustomEvent('sportsHubReminder', {
      detail: {
        match,
        minutes,
        message: reminderMessage
      }
    }));

    // Optional: Try to request permission for future notifications (non-blocking)
    if ('Notification' in window && Notification.permission === 'default') {
      setTimeout(() => {
        this.requestNotificationPermission();
      }, 2000); // Delay to avoid interrupting the reminder experience
    }
  }

  clearReminder(matchKey) {
    const reminder = this.reminders.get(matchKey);
    if (reminder) {
      clearTimeout(reminder.timeoutId);
      this.reminders.delete(matchKey);
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  getAllReminders() {
    return Array.from(this.reminders.values()).map(reminder => ({
      matchKey: reminder.matchKey,
      match: reminder.match,
      minutes: reminder.minutes,
      scheduledFor: reminder.scheduledFor,
      createdAt: reminder.createdAt
    }));
  }

  clearAllReminders() {
    this.reminders.forEach(reminder => {
      clearTimeout(reminder.timeoutId);
    });
    this.reminders.clear();
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    try {
      const remindersData = this.getAllReminders();
      localStorage.setItem('sportsHubReminders', JSON.stringify(remindersData));
    } catch (error) {
    }
  }

  loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('sportsHubReminders');
      if (saved) {
        const remindersData = JSON.parse(saved);
        const now = new Date().getTime();

        remindersData.forEach(reminderData => {
          const scheduledTime = new Date(reminderData.scheduledFor).getTime();
          
          // Only reschedule if the notification time hasn't passed
          if (scheduledTime > now) {
            this.scheduleReminder(reminderData.match, reminderData.minutes);
          }
        });
      }
    } catch (error) {
    }
  }

  getTimeUntilMatch(match) {
    try {
      const now = new Date().getTime();
      const [hours, minutes] = match.time.split(':');
      const matchDate = new Date(match.date);
      matchDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      const matchTime = matchDate.getTime();
      
      const timeDiff = matchTime - now;
      
      if (timeDiff <= 0) {
        return { passed: true, message: 'Match has started or ended' };
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      let message = '';
      if (days > 0) message += `${days}d `;
      if (hrs > 0) message += `${hrs}h `;
      if (mins > 0) message += `${mins}m`;

      return { 
        passed: false, 
        message: message.trim() || 'Less than a minute',
        totalMinutes: Math.floor(timeDiff / (1000 * 60))
      };
    } catch (error) {
      return { passed: true, message: 'Invalid match time' };
    }
  }
}

// Create a singleton instance
const reminderService = new ReminderService();

// Load existing reminders on initialization
reminderService.loadFromLocalStorage();

export default reminderService;