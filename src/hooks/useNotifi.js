import { useEffect } from 'react';

const useNotifi = () => {

  const askNotificationPermission = () => {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
      return;
    }
    Notification.requestPermission().then((permission) => {
      if (permission !== "granted") alert("Please Enable Notification Permission");
    });
  };

  const pushNotifi = (title, body) => {
    const notification = new Notification(title || "Chat App", { body, icon: "public/favicon.svg" });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        // The tab has become visible so clear the now-stale Notification.
        notification.close();
      }
    });
  };

  useEffect(() => {
    askNotificationPermission();

    const urlParams = new URLSearchParams(window.location.search);
    const usernameParam = urlParams.get('u');
    const eventSource = new EventSource(`http://${import.meta.env.VITE_API_URL}/notifi?username=${usernameParam}`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('✅ sse received', data);
      pushNotifi(data?.title, data?.body);
    };

    return (() => {
      eventSource.close();
    });
  }, []);

};

export default useNotifi;