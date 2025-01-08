import React, { useEffect, useState } from "react";
import "./CurtainAnimation.css"; // Import the CSS from your provided code

const CurtainAnimation = () => {
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
        // Enter key
        triggerAnimation();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const triggerAnimation = () => {
    setIsStarted(true);
    setTimeout(() => {
      document.getElementById("starter").style.display = "none";
    }, 2000);
  };

  return (
    <div>
      <div
        id="starter"
        className={isStarted ? "fade-out" : ""}
        onClick={triggerAnimation}
      >
        Press Enter
      </div>
      <div id="scene" className={isStarted ? "expand" : ""}>
        <div id="curtain" className={isStarted ? "open" : ""}>
          <h1>TADA!</h1>
          <div className="ground"></div>
          <div className="left"></div>
          <div className="right"></div>
        </div>
      </div>
    </div>
  );
};

export default CurtainAnimation;
