// import React, { useRef, useState } from 'react';
// import * as THREE from 'three';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Html } from '@react-three/drei';
// import { gsap } from 'gsap';
// import Pano1 from '../../Pano.jpg';

// // Define the scenes, referencing the global `hotspots` for each scene
// const scenes = [
//   {
//     id: 'scene1',
//     image: {Pano1}, // Replace with your first panorama image path
//     hotspots: [
//       ...[
//         {
//           id: 1,
//           pitch: 10,
//           yaw: 100,
//           text: 'Info Hotspot 1',
//           targetScene: 'scene2',
//         },
//         {
//           id: 2,
//           pitch: -5,
//           yaw: 45,
//           text: 'Info Hotspot 2',
//         },
//       ],
//     ],
//   },
//   {
//     id: 'scene2',
//     image: {Pano1}, // Replace with your second panorama image path
//     hotspots: [
//       ...[
//         {
//           id: 3,
//           pitch: 25,
//           yaw: -75,
//           text: 'Info Hotspot 3',
//           targetScene: 'scene1',
//         },
//       ],
//     ],
//   },
// ];

// const PannellumReact = () => {
//   const [currentScene, setCurrentScene] = useState(scenes[0]); // State to track the current scene
//   const cameraRef = useRef();

//   // Helper function to convert spherical coordinates to Cartesian
//   const sphericalToCartesian = (radius, pitch, yaw) => {
//     const phi = THREE.MathUtils.degToRad(90 - pitch);
//     const theta = THREE.MathUtils.degToRad(yaw);

//     return new THREE.Vector3(
//       radius * Math.sin(phi) * Math.cos(theta),
//       radius * Math.cos(phi),
//       radius * Math.sin(phi) * Math.sin(theta)
//     );
//   };

//   // Function to handle hotspot click and navigate to another scene
//   const handleHotspotClick = (targetSceneId) => {
//     const nextScene = scenes.find((scene) => scene.id === targetSceneId);
//     if (nextScene) {
//       // Transition effect using GSAP
//       gsap.to(cameraRef.current, {
//         duration: 0.5,
//         ease: 'power2.inOut',
//         onComplete: () => {
//           setCurrentScene(nextScene); // Update to the new scene
//         },
//       });
//     }
//   };

//   return (
//     <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
//       <Canvas
//         camera={{ position: [0, 0, 0.1], fov: 75 }}
//         onCreated={({ camera }) => (cameraRef.current = camera)}
//       >
//         {/* Panorama Sphere */}
//         <mesh>
//           <sphereGeometry args={[500, 60, 40]} />
//           <meshBasicMaterial side={THREE.BackSide}>
//             <primitive attach="map" object={new THREE.TextureLoader().load(currentScene.image)} />
//           </meshBasicMaterial>
//         </mesh>

//         {/* Render Hotspots */}
//         {currentScene.hotspots.map((hotspot) => {
//           const { pitch, yaw, id, targetScene, text } = hotspot;
//           const position = sphericalToCartesian(500, pitch, yaw);

//           return (
//             <mesh
//               key={id}
//               position={position}
//               onClick={() => targetScene && handleHotspotClick(targetScene)}
//             >
//               <sphereGeometry args={[10, 20, 20]} />
//               <meshBasicMaterial color={0x00ff00} />
//               <Html position={position}>
//                 <div
//                   style={{
//                     color: 'white',
//                     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//                     padding: '5px',
//                     borderRadius: '5px',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   {text}
//                 </div>
//               </Html>
//             </mesh>
//           );
//         })}

//         {/* Orbit Controls for navigation */}
//         <OrbitControls />
//       </Canvas>
//     </div>
//   );
// };

// export default PannellumReact;
// import React, { useRef, useState } from 'react';
// import * as THREE from 'three';
// import { Canvas, useLoader} from '@react-three/fiber';
// import { OrbitControls, Html } from '@react-three/drei';
// import { gsap } from 'gsap';
// import RibbonCutting from '../RibbonCutting';

// const PannellumReact = ({ image, hotspots = [], onSceneChange }) => {
  
//   // Load Texture
//     const texture = useLoader(THREE.TextureLoader, image);
//     texture.colorSpace = THREE.SRGBColorSpace;
//     texture.wrapS = THREE.ClampToEdgeWrapping;
//     texture.wrapT = THREE.ClampToEdgeWrapping;
//     texture.minFilter = THREE.LinearMipMapLinearFilter;
//     texture.magFilter = THREE.LinearFilter;
//     texture.wrapS = THREE.RepeatWrapping;  // Allow texture repetition
//     texture.repeat.x = -1;  // Flip texture horizontally
//     texture.anisotropy = 16; // Makes textures sharper

//   const sphericalToCartesian = (radius, pitch, yaw) => {
//     const phi = THREE.MathUtils.degToRad(90 - pitch);
//     const theta = THREE.MathUtils.degToRad(yaw);

//     return new THREE.Vector3(
//       radius * Math.sin(phi) * Math.cos(theta),
//       radius * Math.cos(phi),
//       radius * Math.sin(phi) * Math.sin(theta)
//     );
//   };

//   const cylindricalToCartesian = (radius, height, angle) => {
//     const theta = THREE.MathUtils.degToRad(angle); // Convert yaw to radians
  
//     return new THREE.Vector3(
//       radius * Math.cos(theta), // X position (circular)
//       height, // Y position (height)
//       radius * Math.sin(theta) // Z position (circular)
//     );
//   };

//   const cameraRef = useRef(); // Reference to the camera
//   const [hoveredHotspot, setHoveredHotspot] = useState(null);
//   const [activeHotspot, setActiveHotspot] = useState(null);

//   const moveCamera = (direction) => {
//     const camera = cameraRef.current;
//     const moveStep = 0.2; // Step size for movement

//     if (!camera) return;

//     const newPosition = camera.position.clone();

//     switch (direction) {
//       case 'left':
//         newPosition.x += moveStep; // Move left
//         break;
//       case 'right':
//         newPosition.x -= moveStep; // Move right
//         break;
//       case 'up':
//         newPosition.y -= moveStep; // Move up
//         break;
//       case 'down':
//         newPosition.y += moveStep; // Move down
//         break;
//       default:
//         break;
//     }

//     // Animate camera position using GSAP
//     gsap.to(camera.position, {
//       x: newPosition.x,
//       y: newPosition.y,
//       z: newPosition.z,
//       duration: 0.5,
//       ease: 'power2.out',
//       onUpdate: () => camera.updateProjectionMatrix(),
//     });
//   };

//   const handleZoomIn = () => {
//     if (cameraRef.current?.fov > 30) {
//       gsap.to(cameraRef.current, {
//         fov: Math.max(30, cameraRef.current.fov - 5),
//         duration: 0.5,
//         ease: 'power2.out',
//         onUpdate: () => cameraRef.current.updateProjectionMatrix(),
//       });
//     }
//   };

//   const handleZoomOut = () => {
//     if (cameraRef.current?.fov < 100) {
//       gsap.to(cameraRef.current, {
//         fov: Math.min(100, cameraRef.current.fov + 5),
//         duration: 0.5,
//         ease: 'power2.out',
//         onUpdate: () => cameraRef.current.updateProjectionMatrix(),
//       });
//     }
//   };

//   return (
//     <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
//       {/* External Controls */}
//       <div
//         style={{
//           position: 'absolute',
//           top: '10px',
//           left: '10px',
//           zIndex: 10,
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '10px',
//         }}
//       >
//         <button
//           onClick={handleZoomIn}
//           style={{
//             padding: '10px 20px',
//             background: 'green',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer',
//           }}
//         >
//           Zoom In
//         </button>
//         <button
//           onClick={handleZoomOut}
//           style={{
//             padding: '10px 20px',
//             background: 'red',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer',
//           }}
//         >
//           Zoom Out
//         </button>
//       </div>

//       {/* Arrow Buttons for Movement */}
//       <div 
//         style={{
//           position: 'absolute',
//           top: '20%',
//           left: '5%',
//           transform: 'translateX(-50%)',
//           zIndex: 10,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: '10px',
//         }}
//       >
//         <button
//           onClick={() => moveCamera('up')}
//           style={{
//             padding: '10px',
//             background: 'blue',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer',
//           }}
//         >
//           ↑
//         </button>
//         <div style={{ display: 'flex', gap: '10px' }}>
//           <button
//             onClick={() => moveCamera('left')}
//             style={{
//               padding: '10px',
//               background: 'blue',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//             }}
//           >
//             ←
//           </button>
//           <button
//             onClick={() => moveCamera('right')}
//             style={{
//               padding: '10px',
//               background: 'blue',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//             }}
//           >
//             →
//           </button>
//         </div>
//         <button
//           onClick={() => moveCamera('down')}
//           style={{
//             padding: '10px',
//             background: 'blue',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer',
//           }}
//         >
//           ↓
//         </button>
//       </div>

//       {/* Scene Navigation */}
//       <div
//         style={{
//           position: 'absolute',
//           bottom: '10px',
//           left: '50%',
//           transform: 'translateX(-50%)',
//           zIndex: 10,
//         }}
//       >
//         <button
//           onClick={() => onSceneChange('prev')}
//           style={{
//             padding: '10px 20px',
//             background: 'orange',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer',
//             marginRight: '10px',
//           }}
//         >
//           Previous Scene
//         </button>
//         {/* <button */}
//           {/* onClick={() => onSceneChange('next')} */}
//           {/* style={{ */}
//             {/* padding: '10px 20px', */}
//             {/* background: 'orange', */}
//             {/* color: 'white', */}
//             {/* border: 'none', */}
//             {/* borderRadius: '5px', */}
//             {/* cursor: 'pointer', */}
//           {/* }} */}
//         {/* > */}
//           {/* Next Scene */}
//         {/* </button> */}
//       </div>

//       {/* Canvas for the 3D Scene */}
//       <Canvas camera={{ position: [-0.20, 0, -0.2], fov: 75 }} onCreated={({ camera }) => (cameraRef.current = camera)}>
//         {/* Panorama Sphere */}
//          <mesh rotation={[0, Math.PI, 0]}>
//           <cylinderGeometry args={[300, 300, 600, 100, 1, true]} />
//           <meshBasicMaterial side={THREE.BackSide} map={texture} />
//         </mesh>
//         {/* <mesh>  
//           <sphereGeometry args={[500, 200, 100]} />
//           <meshBasicMaterial side={THREE.BackSide}>
//             <primitive attach="map" object={new THREE.TextureLoader().load(image)} />
//             <primitive
//             attach="map"
//             object={new THREE.TextureLoader().load(image, (texture) => {
//               texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//               texture.minFilter = THREE.LinearFilter;

//             })}
//           />
//           </meshBasicMaterial>
//         </mesh> */}

//         {/* Render Hotspots */}
//         {/* {hotspots.map((hotspot) => {
//           const { pitch, yaw, text, id,  } = hotspot;
//           const position = sphericalToCartesian(500, pitch, yaw);
//           return (
//             <mesh
//               key={id}
//               position={position}
//               onClick={() => setActiveHotspot(hotspot)}
//               onPointerOver={() => setHoveredHotspot(hotspot)}
//               onPointerOut={() => setHoveredHotspot(null)}
//             >
//               <sphereGeometry args={[10, 20, 20]} />
//               <meshBasicMaterial
//                 color={hoveredHotspot?.id === id ? 0xff0000 : 0x00ff00}
//               />
//             </mesh>
//           );
//         })} */}

//         {hotspots.map((hotspot) => {
//           // const { pitch, yaw, text, id, isNextScene } = hotspot; // Add isNextScene property
//           // const { pitch, yaw, id, isNextScene } = hotspot; // Add isNextScene property
//           // const position = sphericalToCartesian(500, pitch, yaw);
//           const { yaw, pitch, id, isNextScene } = hotspot;
  
//           // Convert to cylindrical coordinates
//           const position = cylindricalToCartesian(300, pitch, yaw);

//           return (
//             <mesh
//               key={id}
//               position={position}
//               onClick={() => {
//                 if (isNextScene) {
//                   onSceneChange('next');  // Switch scene if it's a next scene hotspot
//                 } else {
//                   setActiveHotspot(hotspot);
//                 }
//               }}
//               // onPointerOver={() => setHoveredHotspot(hotspot)}
//               // onPointerOut={() => setHoveredHotspot(null)}
//               onPointerOver={(e) => {
//                 e.stopPropagation();
//                 setHoveredHotspot(hotspot);
//                 document.body.style.cursor = 'pointer'; // Change cursor to pointer
//               }}
//               onPointerOut={() => {
//                 setHoveredHotspot(null);
//                 document.body.style.cursor = 'default'; // Reset cursor when not hovering
//               }}
//             >
//               <sphereGeometry args={[5, 10, 10]} />
//               <meshBasicMaterial color={isNextScene ? 0xffa500 : 0x00ff00} />  {/* Orange for Next Scene */}
//             </mesh>
//           );
//         })}

//         {/* Show Tooltip when hovering over a hotspot */}
//         {hoveredHotspot && (
//           <Html position={sphericalToCartesian(300, hoveredHotspot.pitch, hoveredHotspot.yaw)}>
//             <div
//               style={{
//                 color: 'white',
//                 backgroundColor: 'rgba(0, 0, 0, 0.7)',
//                 padding: '10px',
//                 borderRadius: '5px',
//                 cursor: 'pointer',
//               }}
//             >
//               {hoveredHotspot.text}
//             </div>
//           </Html>
//         )}

//         {/* Show Active Hotspot Details */}
//         {activeHotspot && (
//           <Html position={sphericalToCartesian(300, activeHotspot.pitch, activeHotspot.yaw)}>
//             <div style={{ color: 'white' }}>
//               <RibbonCutting />
//             </div>
//           </Html>
//         )}

//         <OrbitControls />
//       </Canvas>
//     </div>
//   );
// };

// export default PannellumReact;

import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader, useThree, useFrame} from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { gsap } from 'gsap';
import RibbonCutting from '../RibbonCutting';
function PannellumReact  ({ image, hotspots = [], onSceneChange }) {

  // Load Texture
  const texture = useLoader(THREE.TextureLoader, image);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearMipMapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.RepeatWrapping; // Allow texture repetition
  texture.repeat.x = -1; // Flip texture horizontally
  texture.anisotropy = 16; // Makes textures sharper

  // Converts spherical coordinates to cartesian coordinates.
  const sphericalToCartesian = (radius, pitch, yaw) => {
    const phi = THREE.MathUtils.degToRad(90 - pitch);
    const theta = THREE.MathUtils.degToRad(yaw);
    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  // Converts cylindrical coordinates to cartesian coordinates.
  const cylindricalToCartesian = (radius, height, angle) => {
    const theta = THREE.MathUtils.degToRad(angle); // Convert angle to radians
    return new THREE.Vector3(
      radius * Math.cos(theta), // X position (circular)
      height,                  // Y position (height)
      radius * Math.sin(theta) // Z position (circular)
    );
  };

  const cameraRef = useRef(); // Reference to the camera
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const moveCamera = (direction) => {
    const camera = cameraRef.current;
    const moveStep = 0.2; // Step size for movement
    if (!camera) return;
    const newPosition = camera.position.clone();
    switch (direction) {
      case 'left':
        newPosition.x += moveStep; // Move left
        break;
      case 'right':
        newPosition.x -= moveStep; // Move right
        break;
      case 'up':
        newPosition.y -= moveStep; // Move up
        break;
      case 'down':
        newPosition.y += moveStep; // Move down
        break;
      default:
        break;
    }
    // Animate camera position using GSAP
    gsap.to(camera.position, {
      x: newPosition.x,
      y: newPosition.y,
      z: newPosition.z,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => camera.updateProjectionMatrix(),
    });
  };
  const handleZoomIn = () => {
    if (cameraRef.current?.fov > 30) {
      gsap.to(cameraRef.current, {
        fov: Math.max(30, cameraRef.current.fov - 5),
        duration: 0.5,
        ease: 'power2.out',
        onUpdate: () => cameraRef.current.updateProjectionMatrix(),
      });
    }
  };
  const handleZoomOut = () => {
    if (cameraRef.current?.fov < 100) {
      gsap.to(cameraRef.current, {
        fov: Math.min(100, cameraRef.current.fov + 5),
        duration: 0.5,
        ease: 'power2.out',
        onUpdate: () => cameraRef.current.updateProjectionMatrix(),
      });
    }
  };

  // Helper component to render the active hotspot's details.
  // It scales the RibbonCutting component based on the camera's fov.
  const ActiveHotspotHtml = ({ hotspot }) => {
    const { camera } = useThree();
    const initialFov = 75; // Baseline fov (the starting fov of your camera)
    // const scale = initialFov / camera.fov; // Scale increases when zoomed in (fov decreases)
    const [scale, setScale] = useState(1);
    // Dynamically update the scale when zooming
  useFrame(() => {
    const newScale = initialFov / camera.fov; // The scale increases when zooming in
    setScale(newScale);
  });


    return (
      <Html position={sphericalToCartesian(300, hotspot.pitch, hotspot.yaw)}>
        <div 
        // style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center",
          transition: "transform 0.1s ease-out",
        }}
        >
          <RibbonCutting />
        </div>
      </Html>
    );
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* External Controls */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <button
          onClick={handleZoomIn}
          style={{
            padding: '10px 20px',
            background: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Zoom In
        </button>
        <button
          onClick={handleZoomOut}
          style={{
            padding: '10px 20px',
            background: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Zoom Out
        </button>
      </div>
      {/* Arrow Buttons for Movement */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <button
          onClick={() => moveCamera('up')}
          style={{
            padding: '10px',
            background: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          ↑
        </button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => moveCamera('left')}
            style={{
              padding: '10px',
              background: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            ←
          </button>
          <button
            onClick={() => moveCamera('right')}
            style={{
              padding: '10px',
              background: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            →
          </button>
        </div>
        <button
          onClick={() => moveCamera('down')}
          style={{
            padding: '10px',
            background: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          ↓
        </button>
      </div>
      {/* Scene Navigation */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        {/* <button
          onClick={() => onSceneChange('prev')}
          style={{
            padding: '10px 20px',
            background: 'orange',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Previous Scene
        </button>
        {/* Uncomment below if you want a next scene button */}
         {/* <button
          onClick={() => onSceneChange('next')}
          style={{
            padding: '10px 20px',
            background: 'orange',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Next Scene
        </button>  */} 
      </div>

      {/* Canvas for the 3D Scene */}
      <Canvas
        camera={{ position: [-0.2, 0, -0.2], fov: 75 }}
        onCreated={({ camera }) => (cameraRef.current = camera)}
      >
        {/* Panorama Cylinder */}
        <mesh rotation={[0, Math.PI, 0]}>
          <cylinderGeometry args={[300, 300, 600, 100, 1, true]} />
          <meshBasicMaterial side={THREE.BackSide} map={texture} />
        </mesh>

        {/* Render Hotspots */}
        {hotspots.map((hotspot) => {
          // Destructure hotspot properties
          const { yaw, pitch, id, id1,text, isNextScene, isPrevScene} = hotspot;
          console.log( yaw, pitch, id,id1, text,isNextScene, isPrevScene, "hotspot");
          // Convert to cylindrical coordinates (for hotspot mesh positions)
          const position = cylindricalToCartesian(300, pitch, yaw);

          return (
            <mesh
              key={id}
              position={position}
              onClick={() => {
                if (isNextScene) {
                  onSceneChange(id1); // Switch scene if it's a next scene hotspot
                 
                } 
                else if(isPrevScene){
                  onSceneChange(id1);
                  
                }
                else {
                  setActiveHotspot(hotspot);
                }
              }}
              
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredHotspot(hotspot);
                document.body.style.cursor = 'pointer'; // Change cursor to pointer
              }}
              onPointerOut={() => {
                setHoveredHotspot(null);
                document.body.style.cursor = 'default'; // Reset cursor when not hovering
              }}
            >
              <sphereGeometry args={[5, 10, 10]} />
              <meshBasicMaterial color={isNextScene || isPrevScene ? 0xffa500 : 0x00ff00} />
              {/* Orange for Next Scene */}
            </mesh>
          );
        })}

        {/* Show Tooltip when hovering over a hotspot */}
        {hoveredHotspot && (
          <Html position={sphericalToCartesian(300, hoveredHotspot.pitch-5, hoveredHotspot.yaw)}>
            <div
              style={{
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {hoveredHotspot.text}
            </div>
          </Html>
        )}

        {/* Show Active Hotspot Details with scaling RibbonCutting */}
        {activeHotspot && <ActiveHotspotHtml hotspot={activeHotspot} />}

        <OrbitControls minPolarAngle={1.45} maxPolarAngle={1.65}  />
      </Canvas>
    </div>
  );
};

export default PannellumReact;

