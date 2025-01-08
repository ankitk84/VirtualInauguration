import React, { useState } from "react";
import "./Curtains.css";

const Curtains = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCurtains = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="curtains-container">
      <div className={`curtain curtain-left ${isOpen ? "open" : ""}`}></div>
      <div className={`curtain curtain-right ${isOpen ? "open" : ""}`}></div>
      <button className="toggle-button" onClick={toggleCurtains}>
        {isOpen ? "Close Curtains" : "Open Curtains"}
      </button>
    </div>
  );
};

export default Curtains;
