// import React from "react";
// import { Pannellum } from "pannellum-react";
// // import "pannellum-react/lib/styles.css"; // Ensure Pannellum styles are imported
// import myImage from "../../Pano.jpg";

// const PannellumReact = () => {
//   return (
//     <div>
//       <Pannellum
//         width="100%"
//         height="500px"
//         image={myImage}
//         hfov={110}
//         autoLoad
//         showControls={true}
//         hotSpots={[
//           {
//             pitch: 5,
//             yaw: 107,
//             type: "info",
//             text: "Center Hotspot",
//             clickHandlerFunc: () => {
//               alert("Center hotspot clicked!");
//             },
//           },
//           {
//             pitch: -10,
//             yaw: 45,
//             type: "info",
//             text: "Hotspot 2",
//             clickHandlerFunc: () => {
//               alert("Hotspot 2 clicked!");
//             },
//           },
//         ]}
//         onLoad={() => {
//           console.log("Panorama loaded");
//         }}
//       />
//     </div>
//   );
// };

// export default PannellumReact;

// import React from 'react';
// import myImage from "../../Pano.jpg"; 
// import { getConfig } from 'react-pannellum';
// import { Pannellum } from 'pannellum-react';

// const PannellumReact = () => (
//   <>
//    <div> 
//     {/* <Pannellum
//         width="100%"
//         height="500px"
//         image={myImage}
//         pitch={10}
//         yaw={180}
//         hfov={175}
       
//         autoLoad
//         onLoad={() => {
//             console.log("panorama loaded");
//         }}
//     >
     
 
//      <Pannellum.Hotspot
//         type="info"
//         pitch={5}
//         yaw={188}
//         text="Info Hotspot Text 4"
      
//       />
//     </Pannellum> */}
   
//     </div>
//   </>
 
// );
 
// export default PannellumReact;

// import { Pannellum } from "pannellum-react";
// import * as React from 'react';
// import Pano1 from "../../Pano.jpg"

// const PannellumReact = () => {
//   const [yaw, setYaw] = React.useState(0);
//   const [pitch, setPitch] = React.useState(0);
//   const panImage = React.useRef(null);

//   return (
//     <>
//       <div> Pitch: {pitch} </div>
//       <div> Yaw: {yaw} </div>
//       <Pannellum
//         width="90%"
//         height="500px"
//         image={Pano1}
//         pitch={10} 
//         yaw={180}
//         hfov={110}
//         autoLoad
//         showZoomCtrl={false}
//         ref={panImage}
//         onMouseUp={(event) => {
//           const coords = panImage.current.getViewer().mouseEventToCoords(event);
//           setPitch(coords[0]);
//           setYaw(coords[1]);
//         }}
//       >
//         <Pannellum.Hotspot
//           type="custom"
//           pitch={18}
//           yaw={170}
//           handleClick={(evt, name) => console.log(name)}
//           name="image info"
//         />
//       </Pannellum>
//     </>
//   );
// };

// export default PannellumReact;

// import React, { useRef, useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { useLoader } from '@react-three/fiber';
// import * as THREE from 'three';
// import { Html } from '@react-three/drei';  // Import Html from @react-three/drei

// const PannellumReact = ({ image, hotspots }) => {
//   const [hoveredHotspot, setHoveredHotspot] = useState(null);
//   const [activeHotspot, setActiveHotspot] = useState(null);

//   const texture = useLoader(THREE.TextureLoader, image); // Load the panoramic image

//   // Convert spherical coordinates to Cartesian coordinates
//   const sphericalToCartesian = (radius, pitch, yaw) => {
//     const phi = THREE.MathUtils.degToRad(90 - pitch); // Pitch to radians
//     const theta = THREE.MathUtils.degToRad(yaw); // Yaw to radians

//     return new THREE.Vector3(
//       radius * Math.sin(phi) * Math.cos(theta),
//       radius * Math.cos(phi),
//       radius * Math.sin(phi) * Math.sin(theta)
//     );
//   };

//   return (
//     <div style={{ height: '100vh', width: '100%' }}>
//       <Canvas>
//         <ambientLight />
//         <pointLight position={[10, 10, 10]} />
        
//         {/* Create the panoramic sphere */}
//         <mesh>
//           <sphereGeometry args={[500, 60, 60]} />
//           <meshBasicMaterial map={texture} side={THREE.BackSide} />
//         </mesh>

//         {/* Create hotspots */}
//         {hotspots.map((hotspot, index) => {
//           const { pitch, yaw, text, id } = hotspot;
//           const position = sphericalToCartesian(500, pitch, yaw); // Convert to Cartesian coords

//           return (
//             <mesh
//               key={id}
//               position={position}
//               onClick={() => setActiveHotspot(hotspot)}
//               onPointerOver={() => setHoveredHotspot(hotspot)}
//               onPointerOut={() => setHoveredHotspot(null)}
//             >
//               <sphereGeometry args={[10, 8, 8]} />
//               <meshBasicMaterial color={hoveredHotspot?.id === id ? 0xff0000 : 0x00ff00} />
//             </mesh>
//           );
//         })}

//         {/* Show tooltip when hovering over a hotspot */}
//         {hoveredHotspot && (
//           <Html position={sphericalToCartesian(500, hoveredHotspot.pitch, hoveredHotspot.yaw)}>
//             <div
//               style={{
//                 position: 'absolute',
//                 color: 'white',
//                 backgroundColor: 'rgba(0, 0, 0, 0.7)',
//                 padding: '5px',
//                 borderRadius: '5px',
//                 pointerEvents: 'none',
//               }}
//             >
//               {hoveredHotspot.text}
//             </div>
//           </Html>
//         )}

//         {/* Show active hotspot details */}
//         {activeHotspot && (
//           <Html position={sphericalToCartesian(500, activeHotspot.pitch, activeHotspot.yaw)}>
//             <div
//               style={{
//                 position: 'absolute',
//                 color: 'white',
//                 backgroundColor: 'rgba(0, 0, 0, 0.7)',
//                 padding: '10px',
//                 borderRadius: '5px',
//               }}
//             >
//               <h3>{activeHotspot.text}</h3>
//             </div>
//           </Html>
//         )}
//       </Canvas>
//     </div>
//   );
// };

// export default PannellumReact;

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

const PannellumReact = ({ image, hotspots }) => {
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const texture = useLoader(THREE.TextureLoader, image); // Load the panoramic image

  // Convert spherical coordinates to Cartesian coordinates
  const sphericalToCartesian = (radius, pitch, yaw) => {
    const phi = THREE.MathUtils.degToRad(90 - pitch); // Pitch to radians
    const theta = THREE.MathUtils.degToRad(yaw); // Yaw to radians

    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  return (
    <div style={{ height: '80vh', width: '90%' }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {/* Create the panoramic sphere */}
        <mesh>
          {/* Use SphereGeometry and scale it for an inside view */}
          <sphereGeometry args={[500, 40, 40]} />
          <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>

        {/* Create hotspots */}
        {hotspots.map((hotspot, index) => {
          const { pitch, yaw, text, id } = hotspot;
          const position = sphericalToCartesian(500, pitch, yaw); // Convert to Cartesian coords

          return (
            <mesh
              key={id}
              position={position}
              onClick={() => setActiveHotspot(hotspot)}
              onPointerOver={() => setHoveredHotspot(hotspot)}
              onPointerOut={() => setHoveredHotspot(null)}
            >
              <sphereGeometry args={[10, 8, 8]} />
              <meshBasicMaterial color={hoveredHotspot?.id === id ? 0xff0000 : 0x00ff00} />
            </mesh>
          );
        })}

        {/* Show tooltip when hovering over a hotspot */}
        {hoveredHotspot && (
          <Html position={sphericalToCartesian(500, hoveredHotspot.pitch, hoveredHotspot.yaw)}>
            <div
              style={{
                position: 'absolute',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: '5px',
                borderRadius: '5px',
                pointerEvents: 'none',
              }}
            >
              {hoveredHotspot.text}
            </div>
          </Html>
        )}

        {/* Show active hotspot details */}
        {activeHotspot && (
          <Html position={sphericalToCartesian(500, activeHotspot.pitch, activeHotspot.yaw)}>
            <div
              style={{
                position: 'absolute',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              <h3>{activeHotspot.text}</h3>
            </div>
          </Html>
        )}
      </Canvas>
    </div>
  );
};

export default PannellumReact;

