import React, { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";

const UpdateNotification = () => {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);

  useEffect(() => {
    // Initialize update checking
    if ("serviceWorker" in navigator) {
      // Register event listener for new service worker
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
      });

      // Check for updates every 1 hour
      const interval = setInterval(() => {
        navigator.serviceWorker.ready.then((registration) => {
          registration.update();
        });
      }, 60 * 60 * 1000);

      // Event listener for new updates
      window.addEventListener("beforeinstallprompt", (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
      });

      // Listen for service worker updates
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.addEventListener("waiting", (event) => {
            setWaitingWorker(event.target);
            setShowUpdatePrompt(true);
          });
        });
      }

      return () => clearInterval(interval);
    }
  }, []);

  const updateServiceWorker = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
      setShowUpdatePrompt(false);
    }
  };

  if (!showUpdatePrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 flex items-center justify-between">
      <span>A new version is available!</span>
      <button
        onClick={updateServiceWorker}
        className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
      >
        <RefreshCcw size={16} />
        Update Now
      </button>
    </div>
  );
};

export default UpdateNotification;
