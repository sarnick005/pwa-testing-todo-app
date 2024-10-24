import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import Loader from "./Loader";
import "./index.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Listen for service worker updates
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setUpdateAvailable(true);
            }
          });
        });
      });
    }

    return () => clearTimeout(timer);
  }, []);

  const handleUpdate = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.update().then(() => {
          window.location.reload();
        });
      });
    }
  };

  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Todo />
          {updateAvailable && (
            <div className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
              <div className="flex justify-between items-center">
                <span>A new version is available!</span>
                <button
                  onClick={handleUpdate}
                  className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Update Now
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
