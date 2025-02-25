// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import Confetti from "js-confetti";

// const confetti = new Confetti();

// const RibbonCutting = () => {
//   const [cutting, setCutting] = useState(false);
//   const [showScissors, setShowScissors] = useState(true);

//   const startCutting = () => {
//     setCutting(true);
//     setShowScissors(true); // Ensure scissors are visible when cutting starts

//     // Trigger confetti after the ribbon cutting animation
//     setTimeout(() => {
//       confetti.addConfetti();
//       confetti.addConfetti();
//       confetti.addConfetti();
//       confetti.addConfetti();
//       confetti.addConfetti();
//     }, 3000); // Confetti after 3 seconds (duration of the ribbon cutting animation)

//     // Make the scissors disappear
//     setTimeout(() => {
//       setShowScissors(false);
//     }, 3000);

//     // Reset the ribbon and show scissors again after 5 seconds
//     setTimeout(() => {
//       setCutting(false);
//       setShowScissors(true);
//     }, 8000); // 5 seconds after scissors disappear
//   };

//   return (
//     <div
//       className="ribbon-cutting-container"
//       style={{
//         textAlign: "center",
//         paddingBottom: "50px",
//         zIndex: 1000,
//         width: "400px",
//       }}
//     >
//       {/* Start button */}
//       <button
//         onClick={startCutting}
//         style={{
//           // padding: "12px 24px",
//           // fontSize: "16px",
//           cursor: "pointer",
//           backgroundColor: "#007bff",
//           color: "white",
//           // border: "none",
//           borderRadius: "5px",
//           boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
//         }}
//       >
//         Start Ribbon Cutting
//       </button>

//       <div style={{ marginTop: "20px", position: "relative", display: "flex", justifyContent: "center" }}>
//         {/* Left half of the ribbon */}
//         <motion.div
//           style={{
//             background: "red",
//             height: "20px",
//             width: "40%",
//             transformOrigin: "right center",
//             position: "absolute",
//             left: "50%",
//             transform: "translateX(-100%)",
//             borderRadius: "5px",
//             boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
//           }}
//           animate={{
//             scaleX: cutting ? 0 : 1, // Shrinks outward
//           }}
//           transition={{ duration: 3 }}
//         />

//         {/* Right half of the ribbon */}
//         <motion.div
//           style={{
//             background: "red",
//             height: "20px",
//             width: "80%",
//             transformOrigin: "left center",
//             position: "absolute",
//             borderRadius: "5px",
//             boxShadow: "2px 5px 5px rgba(0,0,0,0.2)",
//           }}
//           animate={{
//             scaleX: cutting ? 0 : 1, // Shrinks outward
//           }}
//           transition={{ duration: 3 }}
//         />
//       </div>

//       {/* Scissors animation */}
//       {showScissors && (
//         <motion.div
//           className="scissors"
//           style={{
//             position: "absolute",
//             top: "25%",
//             left: "45%",
//             fontSize: "50px",
//             transformOrigin: "center center",
            
            
//           }}
//           animate={{
//             rotate: cutting ? 0 : 45, // Scissors cutting (opening effect)
//           }}
//           transition={{ duration: 1 }}
//         >
//           <div style={{ transform: "rotate(180deg)", display: "inline-block", marginTop: "45px" }}>
//             ✂️
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default RibbonCutting;

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import Confetti from "js-confetti";

// const confetti = new Confetti();

// const RibbonCutting = () => {
//   const [cutting, setCutting] = useState(false);
//   const [showScissors, setShowScissors] = useState(true);
//   const [ribbonVisible, setRibbonVisible] = useState(true); // New state to track ribbon visibility

//   const startCutting = () => {
//     setCutting(true);
//     setShowScissors(true);

//     // Trigger confetti after the ribbon cutting animation
//     setTimeout(() => {
//       confetti.addConfetti();
//       confetti.addConfetti();
//     }, 3000);

//     // Make the scissors disappear
//     setTimeout(() => {
//       setShowScissors(false);
//     }, 3000);

//     // Hide the ribbon completely after cutting
//     setTimeout(() => {
//       setRibbonVisible(false);
//     }, 3000); // Hides ribbon after the cutting animation completes

//     // Reset everything after 8 seconds
//     setTimeout(() => {
//       setCutting(false);
//       setShowScissors(true);
//       setRibbonVisible(true);
//     }, 10000);
//   };

//   return (
//     <div
//       className="ribbon-cutting-container"
//       style={{
//         textAlign: "center",
//         paddingBottom: "50px",
//         zIndex: 1000,
//         width: "400px",
//       }}
//     >
//       {/* Start button */}
//       <button
//         onClick={startCutting}
//         style={{
//           cursor: "pointer",
//           backgroundColor: "#007bff",
//           color: "white",
//           borderRadius: "5px",
//           boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
//         }}
//       >
//         Start Ribbon Cutting
//       </button>

//       <div style={{ marginTop: "20px", position: "relative", display: "flex", justifyContent: "center" }}>
//         {/* Show ribbon only if ribbonVisible is true */}
//         {ribbonVisible && (
//           <>
//             {/* Left half of the ribbon */}
//             <motion.div
//               style={{
//                 background: "red",
//                 height: "20px",
//                 width: "40%",
//                 transformOrigin: "right center",
//                 position: "absolute",
//                 left: "50%",
//                 transform: "translateX(-100%)",
//                 borderRadius: "5px",
//                 boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
//               }}
//               animate={{
//                 scaleX: cutting ? 0 : 1, // Shrinks outward
//               }}
//               transition={{ duration: 3 }}
//             />

//             {/* Right half of the ribbon */}
//             <motion.div
//               style={{
//                 background: "red",
//                 height: "20px",
//                 width: "80%",
//                 transformOrigin: "left center",
//                 position: "absolute",
//                 borderRadius: "5px",
//                 boxShadow: "2px 5px 5px rgba(0,0,0,0.2)",
//               }}
//               animate={{
//                 scaleX: cutting ? 0 : 1, // Shrinks outward
//               }}
//               transition={{ duration: 3 }}
//             />
//           </>
//         )}
//       </div>

//       {/* Scissors animation */}
//       {showScissors && (
//         <motion.div
//           className="scissors"
//           style={{
//             position: "absolute",
//             top: "25%",
//             left: "45%",
//             fontSize: "50px",
//             transformOrigin: "center center",
//           }}
//           animate={{
//             rotate: cutting ? 0 : 45, // Scissors cutting (opening effect)
//           }}
//           transition={{ duration: 1 }}
//         >
//           <div style={{ transform: "rotate(180deg)", display: "inline-block", marginTop: "45px" }}>
//             ✂️
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default RibbonCutting;

import React, { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "js-confetti";

const confetti = new Confetti();

const RibbonCutting = () => {
  const [cutting, setCutting] = useState(false);
  const [showScissors, setShowScissors] = useState(true);
  const [ribbonVisible, setRibbonVisible] = useState(true);
  const [showButton, setShowButton] = useState(true); // New state for button visibility

  const startCutting = () => {
    setCutting(true);
    setShowScissors(true);
    setShowButton(false); // Hide button when cutting starts

    // Trigger confetti after the ribbon cutting animation
    setTimeout(() => {
      confetti.addConfetti();
      confetti.addConfetti();
    }, 3000);

    // Make the scissors disappear
    setTimeout(() => {
      setShowScissors(false);
    }, 400);

    // Hide the ribbon completely after cutting
    setTimeout(() => {
      setRibbonVisible(false);
    }, 3000);

    // Reset everything after 8 seconds
    setTimeout(() => {
      setCutting(false);
      setShowScissors(true);
      setRibbonVisible(true);
      setShowButton(true); // Show button again after reset
    }, 20000);
  };

  return (
    <div
      className="ribbon-cutting-container"
      style={{
        position: "relative", // Ensure layout doesn't shift
        textAlign: "center",
        
        zIndex: 1000,
        width: "400px",
      }}>

      <div style={{ marginTop: "20px", position: "relative", display: "flex", justifyContent: "center" }}>
        {/* Show ribbon only if ribbonVisible is true */}
        {ribbonVisible && (
          <>
            {/* Left half of the ribbon */}
            <motion.div
              style={{
                background: "red",
                height: "20px",
                width: "40%",
                transformOrigin: "right center",
                position: "absolute",
                left: "50%",
                transform: "translateX(-100%)",
                borderRadius: "5px",
                boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
              }}
              animate={{
                scaleX: cutting ? 0 : 1, // Shrinks outward
              }}
              transition={{ duration: 3 }}
            />

            {/* Right half of the ribbon */}
            <motion.div
              style={{
                background: "red",
                height: "20px",
                width: "80%",
                transformOrigin: "left center",
                position: "absolute",
                borderRadius: "5px",
                boxShadow: "2px 5px 5px rgba(0,0,0,0.2)",
              }}
              animate={{
                scaleX: cutting ? 0 : 1, // Shrinks outward
              }}
              transition={{ duration: 3 }}
            />
          </>
        )}
      </div>

      {/* Scissors animation */}
      {showScissors && (
        <motion.div
          className="scissors"
          style={{
            position: "absolute",
            // top: "15%",
            left: "45%",
            fontSize: "50px",
            transformOrigin: "center center",
          }}
          animate={{
            rotate: cutting ? 0 : 45, // Scissors cutting (opening effect)
          }}
          transition={{ duration: 1 }}
        >
          <div style={{ transform: "rotate(180deg)", display: "inline-block" }}>
            ✂️
          </div>
        </motion.div>
      )}

       {/* Show the button only if showButton is true */}
       {showButton && (
        <button
          onClick={startCutting}
          style={{
            // cursor: "pointer",
            // backgroundColor: "#007bff",
            // color: "white",
            // borderRadius: "5px",
            // boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
            position: "absolute",
            // top: "10px", // Fixed position prevents layout shift
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2, // Ensure button stays on top
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "5px",
            top:"55px",
            boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          Start Ribbon Cutting
        </button>
      )}
    </div>
  );
};

export default RibbonCutting;
