// import React, {useState}  from 'react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import JobnerInauguration from './Rooms/JobnerInauguration';
import KotaInauguration from './Rooms/KotaInauguration';
import BharatpurInauguration from './Rooms/BharatpurInauguration';
import SalawasInauguration from './Rooms/SalawasInauguration';
import Main from './Main';
import Mumbai from './Rooms/Mumbai';
// import Pano1 from '../Pano.jpg';
// import Pano2 from '../pexels-life-of-pix-7919.jpg';
// import PannellumReact from './Rooms/Pano13';

const FirstMain = () => {

//   const scenes = [
//     {
//       id: 1,
//       image: Pano1,
//       hotspots: [
//         { id: 1, pitch: 10, yaw: 100, text: 'Info Hotspot 1' },
//         { id: 2, pitch: -5, yaw: 45, text: 'Info Hotspot 2' },
//         { id: 2, pitch: 25, yaw: -75, text: 'Info Hotspot 2' },
//         { id: 3, pitch: 15, yaw: -70, text: 'Next Scene', isNextScene: true }, // NEW Next Scene hotspot
//       ],
//     },
//     {
//       id: 2,
//       image: Pano2,
//       hotspots: [
//         { id: 3, pitch: 25, yaw: -75, text: 'Info Hotspot 3' },
//         { id: 4, pitch: 15, yaw: 150, text: 'Info Hotspot 4' },
//       ],
//     },
//   ];

//   const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
//   const [transitionStyle, setTransitionStyle] = useState({ transform: "scale(1)", transition: "transform 1.5s ease-in-out" });

//   const handleSceneChange = (isNextScene) => {
//     if (isNextScene) {
//       // Start Zoom-In Effect
//       setTransitionStyle({ transform: "scale(1.3)", transition: "transform 1.5s ease-in-out" });

//       setTimeout(() => {
//         // Switch to next scene after zoom effect completes
//         setCurrentSceneIndex((prevIndex) => (prevIndex + 1) % scenes.length);
//         setTransitionStyle({ transform: "scale(1)", transition: "transform 0.1s ease-in-out" }); // Reset zoom instantly
//       }, 1500);
//     }
//   };

//   return (
//     <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
//       <div style={{ ...transitionStyle, position: "absolute", width: "100%", height: "100%" }}>
//         <PannellumReact
//           image={scenes[currentSceneIndex].image}
//           hotspots={scenes[currentSceneIndex].hotspots}
//           onSceneChange={handleSceneChange}
//         />
//       </div>
//     </div>
//   );
// };  

  // const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  // const [isFading, setIsFading] = useState(false);


  // const handleSceneChange = (direction) => {
  //   setIsFading(true); // Start fade-out animation
  
  //   setTimeout(() => {
  //     setCurrentSceneIndex((prevIndex) => {
  //       if (direction === 'next') {
  //         return (prevIndex + 1) % scenes.length;  // Move to next scene
  //       } else if (direction === 'prev') {
  //         return (prevIndex - 1 + scenes.length) % scenes.length;  // Move to previous scene
  //       }
  //       return prevIndex;
  //     });
  
  //     setTimeout(() => {
  //       setIsFading(false); // Start fade-in animation
  //     }, 500); // Delay to match the fade-out duration
  //   }, 500); // Fade-out duration
  // };
  
  // const handleSceneChange = (direction) => {
  //   setCurrentSceneIndex((prevIndex) => {
  //     if (direction === 'next') {
  //       return (prevIndex + 1) % scenes.length;  // Move to next scene
  //     } else if (direction === 'prev') {
  //       return (prevIndex - 1 + scenes.length) % scenes.length;  // Move to previous scene
  //     }
  //     return prevIndex;
  //   });
  // };
  // const handleSceneChange = (direction) => {
  //   setCurrentSceneIndex((prevIndex) => {
  //     if (direction === 'next') {
  //       return (prevIndex + 1) % scenes.length;  // Loops back to first scene
  //     } else if (direction === 'prev') {
  //       return (prevIndex - 1 + scenes.length) % scenes.length;  // Loops back to last scene
  //     }
  //     return prevIndex;
  //   });
  // };
  // const handleSceneChange = (nextSceneId) => {
  //   const nextIndex = scenes.findIndex(scene => scene.id === nextSceneId);
  //   if (nextIndex !== -1) setCurrentSceneIndex(nextIndex);
  // };
  // const handleSceneChange = (direction) => {
  //   if (direction === 'next') {
  //     setCurrentSceneIndex((prevIndex) => (prevIndex + 1) % scenes.length);
  //   } else if (direction === 'prev') {
  //     setCurrentSceneIndex((prevIndex) => (prevIndex - 1 + scenes.length) % scenes.length);
  //   }
  // };

  // const currentScene = scenes[currentSceneIndex];

  // return (
  //   <div>
  //     <PannellumReact
  //       // image={currentScene.image}
  //       // hotspots={currentScene.hotspots}
  //       // onSceneChange={handleSceneChange}
  //       image={scenes[currentSceneIndex].image}
  //       hotspots={scenes[currentSceneIndex].hotspots}
  //       onSceneChange={handleSceneChange}
  //     />
  //   </div>
  // );
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} /> 
        {/* <Route path="/jobner" element={<JobnerInauguration />} /> */}
        <Route path="/kota" element={<KotaInauguration />} />
        <Route path="/bharatpur" element={<BharatpurInauguration />} />
        <Route path="/salawas" element={<SalawasInauguration/>} />
        <Route path="/mumbai" element={<Mumbai/>}/>

      </Routes>
    </Router>
    // <>
    // <div>
    //   <h1>dsfdsgfdgd</h1>
    //   <PannellumReact/>
    // </div>
    // </>
  );
};

export default FirstMain;
