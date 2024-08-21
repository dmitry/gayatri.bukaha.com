self.addEventListener('install', event => {
    console.log('Service Worker installed');
    // Cache files if necessary
});

self.addEventListener('activate', event => {
    console.log('Service Worker activated');
});

self.addEventListener('push', event => {
    const options = {
        body: event.data.text(),
        icon: '/icons/icon-192x192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Gayatri Mantra Reminder', options).then(() => {
            playNotificationSound();
        })
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});

function playNotificationSound() {
    const audioUrl = '/audio/notification.mp3';

    fetch(audioUrl)
        .then(response => response.blob())
        .then(blob => {
            const audio = new Audio(URL.createObjectURL(blob));
            audio.play();
        })
        .catch(error => console.error('Error playing notification sound:', error));
}
