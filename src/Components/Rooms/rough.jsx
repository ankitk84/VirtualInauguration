import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import RibbonCutting from '../RibbonCutting';

const PannellumReact = ({ image, hotspots = [] }) => {
  const sphericalToCartesian = (radius, pitch, yaw) => {
    const phi = THREE.MathUtils.degToRad(90 - pitch); // Convert pitch to radians
    const theta = THREE.MathUtils.degToRad(yaw); // Convert yaw to radians

    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [fov, setFov] = useState(75); // Default FOV

  // Zoom Controls Component
  const ZoomControls = () => {
    const { camera } = useThree();

    const handleZoomIn = () => {
      if (camera.fov > 30) {
        camera.fov = Math.max(30, camera.fov - 5);
        camera.updateProjectionMatrix();
        setFov(camera.fov);
      }
    };

    const handleZoomOut = () => {
      if (camera.fov < 100) {
        camera.fov = Math.min(100, camera.fov + 5);
        camera.updateProjectionMatrix();
        setFov(camera.fov);
      }
    };

    return (
      <Html>
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 10,
            display: 'flex',
            gap: '10px',
          }}
        >
          <button onClick={handleZoomIn}>Zoom In</button>
          <button onClick={handleZoomOut}>Zoom Out</button>
        </div>
      </Html>
    );
  };

  return (
    <div style={{ width: '80vw', height: '80vh', position: 'relative' }}>
      <Canvas camera={{ fov, position: [0, 0, 0.1] }}>
        {/* Add Panorama Sphere */}
        <mesh>
          <sphereGeometry args={[500, 60, 40]} />
          <meshBasicMaterial side={THREE.BackSide}>
            <primitive attach="map" object={new THREE.TextureLoader().load(image)} />
          </meshBasicMaterial>
        </mesh>

        {/* Render Hotspots */}
        {hotspots.map((hotspot) => {
          const { pitch, yaw, text, id } = hotspot;
          const position = sphericalToCartesian(500, pitch, yaw); // Convert spherical to Cartesian

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
                pointerEvents: 'none',
              }}
            >
              {hoveredHotspot.text}
            </div>
          </Html>
        )}

        {/* Show Active Hotspot Details */}
        {activeHotspot && (
          <Html position={sphericalToCartesian(500, activeHotspot.pitch, activeHotspot.yaw)}>
            <div
              style={{
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              <RibbonCutting />
            </div>
          </Html>
        )}

        {/* Orbit Controls */}
        <OrbitControls />

        {/* Zoom Controls */}
        <ZoomControls />
      </Canvas>
    </div>
  );
};

export default PannellumReact;
