import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import Loader from "./Loader";
import "./index.css";

const App = () => {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return <div className="App">{loading ? <Loader /> : <Todo />}</div>;
};

export default App;
