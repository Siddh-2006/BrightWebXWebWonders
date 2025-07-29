import { useState, useEffect } from 'react';

const useReminder = (match) => {
  const [reminder, setReminder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (reminder) {
      if (!('Notification' in window)) {
        alert('This browser does not support desktop notification');
        return;
      }

      if (Notification.permission === 'granted') {
        scheduleNotification();
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            scheduleNotification();
          }
        });
      }
    }
  }, [reminder, match]);

  const scheduleNotification = () => {
    const now = new Date().getTime();
    const [hours, minutes] = match.time.split(':');
    const matchDate = new Date(match.date);
    matchDate.setHours(hours, minutes, 0, 0);
    const matchTime = matchDate.getTime();
    const notificationTime = matchTime - reminder * 60 * 1000;

    if (notificationTime > now) {
      const timeout = setTimeout(() => {
        new Notification(`Reminder: ${match.homeTeam} vs ${match.awayTeam}`, {
          body: `The match is starting in ${reminder} minutes!`,
          icon: '/ball.png',
        });
      }, notificationTime - now);

      return () => clearTimeout(timeout);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    reminder,
    setReminder,
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useReminder;