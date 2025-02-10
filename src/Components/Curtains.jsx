// import React, { useState } from "react";
// import "./Curtains.css";

// const Curtains = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleCurtains = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="curtains-container">
//       <div className={`curtain curtain-left ${isOpen ? "open" : ""}`}></div>
//       <div className={`curtain curtain-right ${isOpen ? "open" : ""}`}></div>
//       <button className="toggle-button" onClick={toggleCurtains}>
//         {isOpen ? "Close Curtains" : "Open Curtains"}
//       </button>
//     </div>
//   );
// };

// export default Curtains;
// Curtain.js
import React, { useState, useEffect, useRef } from 'react';
import './Curtains.css';

const Curtains = () => {
  const [isOpen, setIsOpen] = useState(false);
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);

  const toggleCurtains = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      curtainLeftRef.current.style.transform = 'translateX(-50%)';
      curtainRightRef.current.style.transform = 'translateX(50%)';
    } else {
      curtainLeftRef.current.style.transform = 'translateX(0)';
      curtainRightRef.current.style.transform = 'translateX(0)';
    }
  }, [isOpen]);

  return (
    <div className="curtain-container">
      <div className="curtain-left" ref={curtainLeftRef}>
        <div className="curtain-wave"></div>
      </div>
      <div className="curtain-right" ref={curtainRightRef}>
        <div className="curtain-wave"></div>
      </div>
      <div className="stage">
        <h1>Welcome to the Inauguration!</h1>
        <p>This is a momentous occasion.</p>
        {/* Add your inauguration content here */}
      </div>
      <button onClick={toggleCurtains} className="curtain-button">
        {isOpen? "Close Curtains": "Open Curtains"}
      </button>
    </div>
  );
};

export default Curtains;