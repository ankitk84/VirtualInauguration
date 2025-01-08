import React, { useState, useRef, useEffect } from 'react';
import JsConfetti from 'js-confetti';  // Correct import for js-confetti
import Presentation from './Presentation11.mp4';  // Ensure the path is correct

const VideoWithConfetti = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const videoRef = useRef(null);  // Reference for the video element

  useEffect(() => {
    // Initialize js-confetti
    const jsConfetti = new JsConfetti();
    
    if (showConfetti) {
      jsConfetti.addConfetti();
      setTimeout(() => {
        setShowConfetti(false); // Hide confetti after it completes
      }, 5000); // Confetti effect duration
    }
  }, [showConfetti]);  // Trigger confetti effect when showConfetti changes

  const handlePlayButtonClick = () => {
    // Start the video playback when the button is clicked
    setIsPlaying(true);
    videoRef.current.play();

    // Trigger confetti after 5 seconds
    setTimeout(() => {
      setShowConfetti(true);
    }, 5000); // Trigger confetti after 5 seconds
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Video Element - Visible and controlled programmatically */}
      <video
        ref={videoRef}  // Use the reference for the video element
        width="600"
        height="400"
        style={{ display: 'block' }} // Keep the video element visible
      >
        <source
          src={Presentation}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Button to start the video and trigger confetti */}
      <button onClick={handlePlayButtonClick}>Please Inaugurate from Here!!!</button>

      {/* Confetti effect */}
      {showConfetti && <div style={{ position: 'fixed', top: 0, left: 0 }}></div>} 
    </div>
  );
};

export default VideoWithConfetti;
