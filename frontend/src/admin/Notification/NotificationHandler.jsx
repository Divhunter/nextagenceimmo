import React, { useEffect, useRef } from 'react';

function NotificationHandler() {
  const audioRef = useRef(null);

  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            showNotification();
          }
        });
      }
    }
  }, []);

  function showNotification(message) {
    const notification = new Notification('Nouveau message !', {
      body: message || 'Vous avez reçu une nouvelle notification.'
    });

    // Jouer un son
    audioRef.current.play();
  }

  return (
    <audio ref={audioRef} src="/chemin/vers/votre/son.mp3" preload="auto"></audio>
  );
}

export default NotificationHandler;
