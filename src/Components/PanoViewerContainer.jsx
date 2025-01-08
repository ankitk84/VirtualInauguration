import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// const PanoViewer = ({ image, hotspots, containerWidth, containerHeight }) => {
//   const mountRef = useRef(null);
//   const [tooltip, setTooltip] = useState(null);
//   const [hoveredHotspot, setHoveredHotspot] = useState(null);
//   const [hotspotPositions, setHotspotPositions] = useState([]); // Store the screen positions of hotspots

//   const projectToScreen = (position, camera, containerWidth, containerHeight) => {
//     if (!position || !(position instanceof THREE.Vector3)) {
//       console.error("Invalid position passed to projectToScreen:", position);
//       return { x: null, y: null };
//     }

//     const vector = position.clone();
//     vector.project(camera);

//     const x = ((vector.x + 1) / 2) * containerWidth;
//     const y = ((1 - vector.y) / 2) * containerHeight;

//     return { x, y };
//   };

//   useEffect(() => {
//     let scene, camera, renderer, controls, mesh;
//     const currentMount = mountRef.current;
//     if (!currentMount) return;

//     // Initialize scene, camera, and renderer
//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(
//       75,
//       containerWidth / containerHeight,
//       0.1,
//       1000
//     );
//     camera.position.set(0, 0, 0.1);
//     renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(containerWidth, containerHeight);
//     currentMount.appendChild(renderer.domElement);

//     // Panorama Sphere
//     const geometry = new THREE.SphereGeometry(500, 60, 40);
//     geometry.scale(-1, 1, 1); // Inside-out view
//     const texture = new THREE.TextureLoader().load(image);
//     const material = new THREE.MeshBasicMaterial({ map: texture });
//     mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);

//     // OrbitControls
//     controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableZoom = true;
//     controls.enablePan = true;
//     controls.update();

//     // Add Hotspots
//     const hotspotGroup = new THREE.Group();
//     scene.add(hotspotGroup);
//     const newHotspotPositions = [];

//     hotspots.forEach((hotspot) => {
//       const phi = THREE.MathUtils.degToRad(90 - hotspot.latitude);
//       const theta = THREE.MathUtils.degToRad(hotspot.longitude);
//       const radius = 500;

//       const hotspotGeometry = new THREE.SphereGeometry(5, 16, 8);
//       const hotspotMaterial = new THREE.MeshBasicMaterial({
//         color: 0xff0000,
//         transparent: true,
//         opacity: 0.5,
//       });
//       const hotspotMesh = new THREE.Mesh(hotspotGeometry, hotspotMaterial);

//       hotspotMesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
//       hotspotMesh.position.y = radius * Math.cos(phi);
//       hotspotMesh.position.z = radius * Math.sin(phi) * Math.sin(theta);

//       hotspotMesh.userData = hotspot;
//       hotspotGroup.add(hotspotMesh);

//       const screenPos = projectToScreen(hotspotMesh.position, camera, containerWidth, containerHeight);
//       if (screenPos.x !== null && screenPos.y !== null) {
//         newHotspotPositions.push({ ...screenPos, title: hotspot.title, description: hotspot.description });
//       }
//     });

//     // Update hotspot positions
//     setHotspotPositions(newHotspotPositions);

//     // Raycasting for hotspot interactions
//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();

//     const onMouseMove = (event) => {
//       mouse.x = (event.clientX / containerWidth) * 2 - 1;
//       mouse.y = -(event.clientY / containerHeight) * 2 + 1;

//       raycaster.setFromCamera(mouse, camera);
//       const intersects = raycaster.intersectObjects(hotspotGroup.children);

//       if (intersects.length > 0) {
//         setHoveredHotspot(intersects[0].object.userData);
//         document.body.style.cursor = 'pointer';
//       } else {
//         setHoveredHotspot(null);
//         document.body.style.cursor = 'default';
//       }
//     };

//     const onMouseClick = (event) => {
//       mouse.x = (event.clientX / containerWidth) * 2 - 1;
//       mouse.y = -(event.clientY / containerHeight) * 2 + 1;

//       raycaster.setFromCamera(mouse, camera);
//       const intersects = raycaster.intersectObjects(hotspotGroup.children);

//       if (intersects.length > 0) {
//         const intersectedObject = intersects[0].object;
//         if (intersectedObject.userData) {
//           setTooltip(intersectedObject.userData);
//         }
//       }
//     };

//     window.addEventListener('mousemove', onMouseMove);
//     window.addEventListener('click', onMouseClick);

//     // Animation loop
//     const animate = () => {
//       controls.update();
//       renderer.render(scene, camera);
//       requestAnimationFrame(animate);
//     };
//     animate();

//     // Handle resizing
//     const handleResize = () => {
//       renderer.setSize(containerWidth, containerHeight);
//       camera.aspect = containerWidth / containerHeight;
//       camera.updateProjectionMatrix();

//       // Recalculate hotspot positions
//       const updatedHotspotPositions = hotspotGroup.children.map((hotspotMesh) => {
//         const screenPos = projectToScreen(hotspotMesh.position, camera, containerWidth, containerHeight);
//         return screenPos.x !== null && screenPos.y !== null
//           ? { ...screenPos, title: hotspotMesh.userData.title, description: hotspotMesh.userData.description }
//           : null;
//       }).filter(Boolean);

//       setHotspotPositions(updatedHotspotPositions);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('click', onMouseClick);
//       window.removeEventListener('mousemove', onMouseMove);
//       if (currentMount.contains(renderer.domElement)) {
//         currentMount.removeChild(renderer.domElement);
//       }
//       renderer.dispose();
//       texture.dispose();
//       material.dispose();
//       geometry.dispose();
//     };
//   }, [image, hotspots, containerWidth, containerHeight]);

//   return (
//     <div ref={mountRef} style={{ width: containerWidth, height: containerHeight }}>
//       {tooltip && tooltip.position && (
//         <div
//           style={{
//             position: 'absolute',
//             top: `${tooltip.position.y}px`,
//             left: `${tooltip.position.x}px`,
//             backgroundColor: 'rgba(0, 0, 0, 0.7)',
//             color: 'white',
//             padding: '10px',
//             borderRadius: '25px',
//             zIndex: 1000,
//           }}
//         >
//           <h3>{tooltip.title}</h3>
//           <p>{tooltip.description}</p>
//         </div>
//       )}

//       {hoveredHotspot && hoveredHotspot.position && (
//         <div
//           style={{
//             position: 'absolute',
//             top: `${hoveredHotspot.position.y}px`,
//             left: `${hoveredHotspot.position.x}px`,
//             pointerEvents: 'none',
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: 'rgba(255, 255, 0, 0.5)',
//               borderRadius: '5px',
//               padding: '5px',
//             }}
//           >
//             {hoveredHotspot.title}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


const PanoViewer = ({ image, hotspots, containerWidth, containerHeight }) => {
    const mountRef = useRef(null);
    const [tooltip, setTooltip] = useState(null);
    const [hoveredHotspot, setHoveredHotspot] = useState(null);
    const [hotspotPositions, setHotspotPositions] = useState([]);
  
    const projectToScreen = (position, camera, containerWidth, containerHeight) => {
      if (!position || !(position instanceof THREE.Vector3)) {
        console.error("Invalid position passed to projectToScreen:", position);
        return { x: null, y: null };
      }
  
      const vector = position.clone();
      vector.project(camera);
  
      const x = ((vector.x + 1) / 2) * containerWidth;
      const y = ((1 - vector.y) / 2) * containerHeight;
  
      return { x, y };
    };
  
    useEffect(() => {
      let scene, camera, renderer, controls, mesh;
      const currentMount = mountRef.current;
      if (!currentMount) return;
  
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        containerWidth / containerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 0.1);
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(containerWidth, containerHeight);
      currentMount.appendChild(renderer.domElement);
  
      // Panorama Sphere
      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1);
      const texture = new THREE.TextureLoader().load(image);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
  
      // OrbitControls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = true;
      controls.enablePan = true;
      controls.update();
  
      // Add Hotspots
      const hotspotGroup = new THREE.Group();
      scene.add(hotspotGroup);
      const newHotspotPositions = [];
  
      hotspots.forEach((hotspot) => {
        const phi = THREE.MathUtils.degToRad(90 - hotspot.latitude);
        const theta = THREE.MathUtils.degToRad(hotspot.longitude);
        const radius = 500;
  
        const hotspotGeometry = new THREE.SphereGeometry(5, 16, 8);
        const hotspotMaterial = new THREE.MeshBasicMaterial({
          color: 0xff0000,
          transparent: true,
          opacity: 0.5,
        });
        const hotspotMesh = new THREE.Mesh(hotspotGeometry, hotspotMaterial);
  
        hotspotMesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
        hotspotMesh.position.y = radius * Math.cos(phi);
        hotspotMesh.position.z = radius * Math.sin(phi) * Math.sin(theta);
  
        hotspotMesh.userData = hotspot;
        hotspotGroup.add(hotspotMesh);
  
        const screenPos = projectToScreen(hotspotMesh.position, camera, containerWidth, containerHeight);
        if (screenPos.x !== null && screenPos.y !== null) {
          newHotspotPositions.push({
            ...screenPos,
            title: hotspot.title,
            description: hotspot.description,
            latitude: hotspot.latitude,
            longitude: hotspot.longitude,
          });
        }
      });
  
      setHotspotPositions(newHotspotPositions);
  
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
  
      const onMouseMove = (event) => {
        mouse.x = (event.clientX / containerWidth) * 2 - 1;
        mouse.y = -(event.clientY / containerHeight) * 2 + 1;
  
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(hotspotGroup.children);
  
        if (intersects.length > 0) {
          const hovered = intersects[0].object.userData;
          setHoveredHotspot({
            ...hovered,
            position: projectToScreen(intersects[0].object.position, camera, containerWidth, containerHeight),
          });
          document.body.style.cursor = 'pointer';
        } else {
          setHoveredHotspot(null);
          document.body.style.cursor = 'default';
        }
      };
  
      const onMouseClick = (event) => {
        mouse.x = (event.clientX / containerWidth) * 2 - 1;
        mouse.y = -(event.clientY / containerHeight) * 2 + 1;
  
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(hotspotGroup.children);
  
        if (intersects.length > 0) {
          const intersectedObject = intersects[0].object;
          if (intersectedObject.userData) {
            setTooltip({
              ...intersectedObject.userData,
              position: projectToScreen(intersectedObject.position, camera, containerWidth, containerHeight),
            });
          }
        }
      };
  
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('click', onMouseClick);
  
      const animate = () => {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();
  
      const handleResize = () => {
        renderer.setSize(containerWidth, containerHeight);
        camera.aspect = containerWidth / containerHeight;
        camera.updateProjectionMatrix();
  
        const updatedHotspotPositions = hotspotGroup.children.map((hotspotMesh) => {
          const screenPos = projectToScreen(hotspotMesh.position, camera, containerWidth, containerHeight);
          return screenPos.x !== null && screenPos.y !== null
            ? { ...screenPos, title: hotspotMesh.userData.title, description: hotspotMesh.userData.description }
            : null;
        }).filter(Boolean);
  
        setHotspotPositions(updatedHotspotPositions);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('click', onMouseClick);
        window.removeEventListener('mousemove', onMouseMove);
        if (currentMount.contains(renderer.domElement)) {
          currentMount.removeChild(renderer.domElement);
        }
        renderer.dispose();
        texture.dispose();
        material.dispose();
        geometry.dispose();
      };
    }, [image, hotspots, containerWidth, containerHeight]);
  
    return (
      <div ref={mountRef} style={{ width: containerWidth, height: containerHeight }}>
        {tooltip && tooltip.position && (
          <div
            style={{
              position: 'absolute',
              top: `${tooltip.position.y}px`,
              left: `${tooltip.position.x}px`,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '10px',
              borderRadius: '25px',
              zIndex: 1000,
            }}
          >
            <h3>{tooltip.title}</h3>
            <p>{tooltip.description}</p>
            <p><strong>Latitude:</strong> {tooltip.latitude}</p>
            <p><strong>Longitude:</strong> {tooltip.longitude}</p>
          </div>
        )}
  
        {hoveredHotspot && hoveredHotspot.position && (
          <div
            style={{
              position: 'absolute',
              top: `${hoveredHotspot.position.y}px`,
              left: `${hoveredHotspot.position.x}px`,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 0, 0.5)',
                borderRadius: '5px',
                padding: '5px',
              }}
            >
              {hoveredHotspot.title}
              <br />
              <small>{`Lat: ${hoveredHotspot.latitude}, Long: ${hoveredHotspot.longitude}`}</small>
            </div>
          </div>
        )}
      </div>
    );
  };
  
export default PanoViewer;

