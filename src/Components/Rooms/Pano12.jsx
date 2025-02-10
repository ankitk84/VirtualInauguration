// import React, { useRef, useEffect, useState} from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// const PannellumReact = ({ image }) => {
//   const mountRef = useRef(null);
//   const [hoveredHotspot, setHoveredHotspot] = useState(null);
//   const [activeHotspot, setActiveHotspot] = useState(null);

//   // Convert spherical coordinates to Cartesian coordinates
//     const sphericalToCartesian = (radius, pitch, yaw) => {
//       const phi = THREE.MathUtils.degToRad(90 - pitch); // Pitch to radians
//       const theta = THREE.MathUtils.degToRad(yaw); // Yaw to radians
  
//       return new THREE.Vector3(
//         radius * Math.sin(phi) * Math.cos(theta),
//         radius * Math.cos(phi),
//         radius * Math.sin(phi) * Math.sin(theta)
//       );
//     };

    

//   useEffect(() => {
//     let scene, camera, renderer, controls, mesh;
//     const currentMount = mountRef.current;

//     if (!currentMount) return;

//     // Initialize Three.js Scene
//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.set(0, 0, 0.1);

//     renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     currentMount.appendChild(renderer.domElement);

//     // Update camera aspect ratio
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     // Create Panorama Sphere
//     const geometry = new THREE.SphereGeometry(500, 40, 40);
//     geometry.scale(-1, 1, 1); // Invert sphere for internal viewing
//     const texture = new THREE.TextureLoader().load(image);
//     const material = new THREE.MeshBasicMaterial({ map: texture });
//     mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);

//     // Add Orbit Controls
//     controls = new OrbitControls(camera, renderer.domElement);
//     controls.update();

//     // Animation Loop
//     const animate = () => {
//       controls.update();
//       renderer.render(scene, camera);
//       requestAnimationFrame(animate);
//     };
//     animate();

//     // Cleanup on unmount
//     return () => {
//       if (currentMount && renderer.domElement) {
//         currentMount.removeChild(renderer.domElement);
//       }
//       geometry.dispose();
//       material.dispose();
//       texture.dispose();
//       renderer.dispose();
//     };
//   }, [image]);

//   return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }}></div>;
// };

// export default PannellumReact;
// import React, { useRef, useEffect, useState } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Html } from '@react-three/drei';

// const PannellumReact = ({ image, hotspots = [] }) => {
//   const mountRef = useRef(null);
//   const [hoveredHotspot, setHoveredHotspot] = useState(null);
//   const [activeHotspot, setActiveHotspot] = useState(null);

//   // Convert spherical coordinates to Cartesian coordinates
//   const sphericalToCartesian = (radius, pitch, yaw) => {
//     const phi = THREE.MathUtils.degToRad(90 - pitch); // Convert pitch to radians
//     const theta = THREE.MathUtils.degToRad(yaw); // Convert yaw to radians

//     return new THREE.Vector3(
//       radius * Math.sin(phi) * Math.cos(theta),
//       radius * Math.cos(phi),
//       radius * Math.sin(phi) * Math.sin(theta)
//     );
//   };

//   useEffect(() => {
//     let scene, camera, renderer, controls, mesh;
//     const currentMount = mountRef.current;

//     if (!currentMount) return;

//     // Initialize Three.js Scene
//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.set(0, 0, 0.1);

//     renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     currentMount.appendChild(renderer.domElement);

//     // Update camera aspect ratio
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     // Create Panorama Sphere
//     const geometry = new THREE.SphereGeometry(500, 40, 40);
//     geometry.scale(-1, 1, 1); // Invert sphere for internal viewing
//     const texture = new THREE.TextureLoader().load(image);
//     const material = new THREE.MeshBasicMaterial({ map: texture });
//     mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);

//     // Add Orbit Controls
//     controls = new OrbitControls(camera, renderer.domElement);
//     controls.update();

//     // Animation Loop
//     const animate = () => {
//       controls.update();
//       renderer.render(scene, camera);
//       requestAnimationFrame(animate);
//     };
//     animate();

//     // Cleanup on unmount
//     return () => {
//       if (currentMount && renderer.domElement) {
//         currentMount.removeChild(renderer.domElement);
//       }
//       geometry.dispose();
//       material.dispose();
//       texture.dispose();
//       renderer.dispose();
//     };
//   }, [image]);

//   return (
//     <div ref={mountRef} style={{ width: '100vw', height: '100vh' }}>
//       <Canvas>
//         {/* Render Hotspots */}
//         {hotspots.map((hotspot, index) => {
//           const { pitch, yaw, text, id } = hotspot;
//           const position = sphericalToCartesian(500, pitch, yaw);

//           return (
//             <mesh
//               key={id}
//               position={position}
//               onClick={() => setActiveHotspot(hotspot)}
//               onPointerOver={() => setHoveredHotspot(hotspot)}
//               onPointerOut={() => setHoveredHotspot(null)}
//             >
//               <sphereGeometry args={[10, 8, 8]} />
//               <meshBasicMaterial
//                 color={hoveredHotspot?.id === id ? 0xff0000 : 0x00ff00}
//               />
//             </mesh>
//           );
//         })}

//         {/* Show Tooltip */}
//         {hoveredHotspot && (
//           <Html position={sphericalToCartesian(500, hoveredHotspot.pitch, hoveredHotspot.yaw)}>
//             <div
//               style={{
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

//         {/* Show Active Hotspot Details */}
//         {activeHotspot && (
//           <Html position={sphericalToCartesian(500, activeHotspot.pitch, activeHotspot.yaw)}>
//             <div
//               style={{
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

// import React, { useRef, useState, useEffect } from 'react';
// import * as THREE from 'three';
// import { Canvas, useThree } from '@react-three/fiber';
// import { OrbitControls, Html } from '@react-three/drei';
// import RibbonCutting from '../RibbonCutting';

// const PannellumReact = ({ image, hotspots = [] }) => {   
//     const sphericalToCartesian = (radius, pitch, yaw) => {
//     const phi = THREE.MathUtils.degToRad(90 - pitch); // Convert pitch to radians
//     const theta = THREE.MathUtils.degToRad(yaw); // Convert yaw to radians

//     return new THREE.Vector3(
//       radius * Math.sin(phi) * Math.cos(theta),
//       radius * Math.cos(phi),
//       radius * Math.sin(phi) * Math.sin(theta)
//     );
//   };

//   const [hoveredHotspot, setHoveredHotspot] = useState(null);
//   const [activeHotspot, setActiveHotspot] = useState(null);
//   const [fov, setFov] = useState(75); // Default FOV
  
//     // Zoom Controls Component
//     const ZoomControls = () => {
//     const { camera } = useThree();
  
//     const handleZoomIn = () => {
//         if (camera.fov > 30) {
//           camera.fov = Math.max(30, camera.fov - 5);
//           camera.updateProjectionMatrix();
//           setFov(camera.fov);
//         }
//       };
//     const handleZoomOut = () => {
//         if (camera.fov < 100) {
//           camera.fov = Math.min(100, camera.fov + 5);
//           camera.updateProjectionMatrix();
//           setFov(camera.fov);
//         }
//       };
  
//       return (
//             <Html transform={false}
//             center={false}>
//               <div className='abc'
//                 style={{
//                   // position: 'fixed',
//                   // top: '-10px', // Align to the top
//                   // left: '-10px', // Align to the left
//                   zIndex: 10, // Ensure it's on top
//                   // display: 'flex',
//                   // flexDirection: 'column', // Stack buttons vertically
//                   // gap: '5px', // Add spacing between buttons
                  
//                 }}>
//                 <button onClick={handleZoomIn}>Zoom In</button>
//                 <button onClick={handleZoomOut}>Zoom Out</button>
//               </div>
//             </Html>
//           );
//         };
      

//   return (
//     <div className='div1' style={{ width: '80vw', height: '80vh'}}>
//       <Canvas  className="div2"  camera={{ fov, position: [0, 0, 0.1] }}>
//         {/* Add Panorama Sphere */}
//         <mesh>
//           <sphereGeometry args={[500, 60, 40]} />
//           <meshBasicMaterial side={THREE.BackSide}>
//             <primitive attach="map" object={new THREE.TextureLoader().load(image)} />
//           </meshBasicMaterial>
//         </mesh>

//         {/* Render Hotspots */}
//         {hotspots.map((hotspot) => {
//           const { pitch, yaw, text, id } = hotspot;
//           const position = sphericalToCartesian(500, pitch, yaw); // Convert spherical to Cartesian

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
//         })}

//         {/* Show Tooltip when hovering over a hotspot */}
//         {hoveredHotspot && (
//           <Html   position={sphericalToCartesian(500, hoveredHotspot.pitch, hoveredHotspot.yaw)}>
//             <div
//               style={{
//                 color: 'white',
//                 backgroundColor: 'rgba(0, 0, 0, 0.7)',
//                 padding: '10px',
//                 borderRadius: '5px',
//                 pointerEvents: 'none',
//               }}
//             >
//               {hoveredHotspot.text}
//             </div>
//           </Html>
//         )}

//         {/* Show Active Hotspot Details */}
//         {activeHotspot && (
//           <Html position={sphericalToCartesian(500, activeHotspot.pitch, activeHotspot.yaw)}>
//             <div
//               style={{
//                 color: 'white',
//                 // backgroundColor: 'rgba(0, 0, 0, 0.7)',
//                 // padding: '10px',
//                 // borderRadius: '5px',
//               }}
//             >
//               {/* <h3>{activeHotspot.text}</h3> */}
//               <RibbonCutting/>
//             </div>
//           </Html>
//         )}

//         <OrbitControls />
//         <ZoomControls />
//       </Canvas>
//     </div>
//   );
// };

// export default PannellumReact;

// import React, { useRef, useState } from 'react';
// import * as THREE from 'three';
// import { Canvas, useThree } from '@react-three/fiber';
// import { OrbitControls, Html } from '@react-three/drei';
// import RibbonCutting from '../RibbonCutting';

// const PannellumReact = ({ image, hotspots = [] }) => {
//   const sphericalToCartesian = (radius, pitch, yaw) => {
//     const phi = THREE.MathUtils.degToRad(90 - pitch);
//     const theta = THREE.MathUtils.degToRad(yaw);

//     return new THREE.Vector3(
//       radius * Math.sin(phi) * Math.cos(theta),
//       radius * Math.cos(phi),
//       radius * Math.sin(phi) * Math.sin(theta)
//     );
//   };

//   const [hoveredHotspot, setHoveredHotspot] = useState(null);
//   const [activeHotspot, setActiveHotspot] = useState(null);
//   const [fov, setFov] = useState(75); // Default FOV

//   // Zoom Controls Component
//   const ZoomControls = () => {
//     const { camera } = useThree();

//     const handleZoomIn = () => {
//       if (camera.fov > 30) {
//         camera.fov = Math.max(30, camera.fov - 5);
//         camera.updateProjectionMatrix();
//         setFov(camera.fov);
//       }
//     };

//     const handleZoomOut = () => {
//       if (camera.fov < 100) {
//         camera.fov = Math.min(100, camera.fov + 5);
//         camera.updateProjectionMatrix();
//         setFov(camera.fov);
//       }
//     };

//     return (
//       <Html position={[0, 0, 0]} transform={false} center={false}>
//         <div
//           style={{
//             position: 'fixed',
//             bottom: '20px',
//             left: '20px',
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '10px',
//             zIndex: 100,
//           }}
//         >
//           <button
//             onClick={handleZoomIn}
//             style={{
//               padding: '10px 20px',
//               background: 'green',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//             }}
//           >
//             Zoom In
//           </button>
//           <button
//             onClick={handleZoomOut}
//             style={{
//               padding: '10px 20px',
//               background: 'red',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//             }}
//           >
//             Zoom Out
//           </button>
//         </div>
//       </Html>
//     );
//   };

//   return (
//     <div className="div1" style={{ width: '80vw', height: '80vh' }}>
//       <Canvas camera={{ fov, position: [0, 0, 0.1] }}>
//         {/* Add Panorama Sphere */}
//         <mesh>
//           <sphereGeometry args={[500, 60, 40]} />
//           <meshBasicMaterial side={THREE.BackSide}>
//             <primitive attach="map" object={new THREE.TextureLoader().load(image)} />
//           </meshBasicMaterial>
//         </mesh>

//         {/* Render Hotspots */}
//         {hotspots.map((hotspot) => {
//           const { pitch, yaw, text, id } = hotspot;
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
//         })}

//         {/* Show Tooltip when hovering over a hotspot */}
//         {hoveredHotspot && (
//           <Html position={sphericalToCartesian(500, hoveredHotspot.pitch, hoveredHotspot.yaw)}>
//             <div
//               style={{
//                 color: 'white',
//                 backgroundColor: 'rgba(0, 0, 0, 0.7)',
//                 padding: '10px',
//                 borderRadius: '5px',
//                 pointerEvents: 'none',
//               }}
//             >
//               {hoveredHotspot.text}
//             </div>
//           </Html>
//         )}

//         {/* Show Active Hotspot Details */}
//         {activeHotspot && (
//           <Html position={sphericalToCartesian(500, activeHotspot.pitch, activeHotspot.yaw)}>
//             <div
//               style={{
//                 color: 'white',
//               }}
//             >
//               <RibbonCutting />
//             </div>
//           </Html>
//         )}

//         <OrbitControls />
//         <ZoomControls />
//       </Canvas>
//     </div>
//   );
// };

// export default PannellumReact;

// this code is fine but without left, right, up and down
// import React, { useRef, useState } from 'react';
// import * as THREE from 'three';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Html } from '@react-three/drei';
// import RibbonCutting from '../RibbonCutting';

// const PannellumReact = ({ image, hotspots = [] }) => {
//   const sphericalToCartesian = (radius, pitch, yaw) => {
//     const phi = THREE.MathUtils.degToRad(90 - pitch);
//     const theta = THREE.MathUtils.degToRad(yaw);

//     return new THREE.Vector3(
//       radius * Math.sin(phi) * Math.cos(theta),
//       radius * Math.cos(phi),
//       radius * Math.sin(phi) * Math.sin(theta)
//     );
//   };

//   const cameraRef = useRef(); // Reference to the camera
//   const [hoveredHotspot, setHoveredHotspot] = useState(null);
//   const [activeHotspot, setActiveHotspot] = useState(null);

//   // Zoom in/out functionality
//   const handleZoomIn = () => {
//     if (cameraRef.current?.fov > 30) {
//       cameraRef.current.fov = Math.max(30, cameraRef.current.fov - 5);
//       cameraRef.current.updateProjectionMatrix();
//     }
//   };

//   const handleZoomOut = () => {
//     if (cameraRef.current?.fov < 100) {
//       cameraRef.current.fov = Math.min(100, cameraRef.current.fov + 5);
//       cameraRef.current.updateProjectionMatrix();
//     }
//   };

//   return (
//     <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
//       {/* External Zoom Controls */}
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

//       {/* Canvas for the 3D Scene */}
//       <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }} onCreated={({ camera }) => (cameraRef.current = camera)}>
//         {/* Panorama Sphere */}
//         <mesh>
//           <sphereGeometry args={[500, 60, 40]} />
//           <meshBasicMaterial side={THREE.BackSide}>
//             <primitive attach="map" object={new THREE.TextureLoader().load(image)} />
//           </meshBasicMaterial>
//         </mesh>

//         {/* Render Hotspots */}
//         {hotspots.map((hotspot) => {
//           const { pitch, yaw, text, id } = hotspot;
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
//         })}

//         {/* Show Tooltip when hovering over a hotspot */}
//         {hoveredHotspot && (
//           <Html position={sphericalToCartesian(500, hoveredHotspot.pitch, hoveredHotspot.yaw)}>
//             <div
//               style={{
//                 color: 'white',
//                 backgroundColor: 'rgba(0, 0, 0, 0.7)',
//                 padding: '10px',
//                 borderRadius: '5px',
//                 // pointerEvents: 'none',
//                 cursor:'pointer',
//               }}
//             >
//               {hoveredHotspot.text}
//             </div>
//           </Html>
//         )}

//         {/* Show Active Hotspot Details */}
//         {activeHotspot && (
//           <Html position={sphericalToCartesian(500, activeHotspot.pitch, activeHotspot.yaw)}>
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


//  using arrow up and down, left and right
import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas} from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { gsap } from 'gsap';
import RibbonCutting from '../RibbonCutting';

const PannellumReact = ({ image, hotspots = [] }) => {
  const sphericalToCartesian = (radius, pitch, yaw) => {
    const phi = THREE.MathUtils.degToRad(90 - pitch);
    const theta = THREE.MathUtils.degToRad(yaw);

    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  const cameraRef = useRef(); // Reference to the camera
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Smooth movement function using GSAP
  // const moveCamera = (direction) => {
  //   const camera = cameraRef.current;
  //   const moveStep = 10; // Step size for movement

  //   if (!camera) return;

  //   const newPosition = camera.position.clone();

  //   switch (direction) {
  //     case 'left':
  //       newPosition.x -= moveStep;
  //       break;
  //     case 'right':
  //       newPosition.x += moveStep;
  //       break;
  //     case 'up':
  //       newPosition.y += moveStep;
  //       break;
  //     case 'down':
  //       newPosition.y -= moveStep;
  //       break;
  //     default:
  //       break;
  //   }

  //   // Animate camera position using GSAP
  //   gsap.to(camera.position, {
  //     x: newPosition.x,
  //     y: newPosition.y,
  //     z: newPosition.z,
  //     duration: 0.5,
  //     ease: 'power2.out',
  //     onUpdate: () => camera.updateProjectionMatrix(),
  //   });
  // };
  const moveCamera = (direction) => {
    const camera = cameraRef.current;
    const moveStep = 2; // Step size for movement
  
    if (!camera) return;
  
    const newPosition = camera.position.clone();
  
    switch (direction) {
      case 'left':
        newPosition.x -= moveStep; // Move left
        break;
      case 'right':
        newPosition.x += moveStep; // Move right
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

  // Zoom in/out functionality
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
          // bottom: '10px',
          top:'20%',
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

      {/* Canvas for the 3D Scene */}
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }} onCreated={({ camera }) => (cameraRef.current = camera)}>
        {/* Panorama Sphere */}
        <mesh>
          <sphereGeometry args={[500, 60, 40]} />
          <meshBasicMaterial side={THREE.BackSide}>
            <primitive attach="map" object={new THREE.TextureLoader().load(image)} />
          </meshBasicMaterial>
        </mesh>

        {/* Render Hotspots */}
        {hotspots.map((hotspot) => {
          // const { pitch, yaw, text, id } = hotspot;
          const { pitch, yaw, id } = hotspot;
          const position = sphericalToCartesian(500, pitch, yaw);

          return (
            <mesh
              key={id}
              position={position}
              onClick={() => setActiveHotspot(hotspot)}
              onPointerOver={() => setHoveredHotspot(hotspot)}
              onPointerOut={() => setHoveredHotspot(null)}
            >
              <sphereGeometry args={[10, 20, 20]} />
              <meshBasicMaterial
                color={hoveredHotspot?.id === id ? 0xff0000 : 0x00ff00}
              />
            </mesh>
          );
        })}

        {/* Show Tooltip when hovering over a hotspot */}
        {hoveredHotspot && (
          <Html position={sphericalToCartesian(500, hoveredHotspot.pitch, hoveredHotspot.yaw)}>
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

        {/* Show Active Hotspot Details */}
        {activeHotspot && (
          <Html position={sphericalToCartesian(500, activeHotspot.pitch, activeHotspot.yaw)}>
            <div style={{ color: 'white' }}>
              <RibbonCutting />
            </div>
          </Html>
        )}

        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default PannellumReact;
