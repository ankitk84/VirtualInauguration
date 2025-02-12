import React, {useState} from 'react';
import Pic1 from './pic1.jpg';
import Pic2 from './pic2.jpg';
import Pic3 from './pic3.jpg';
import Pic4 from './pic4.jpg';
import Pic5 from './pic5.jpg';
import Pic6 from './pic6.jpg';
import Pic7 from './pic7.jpg';
import PannellumReact from './Pano13';

function Mumbai (){
    const scenes = [
        {
          id: 1,
          image: Pic4,
          hotspots: [
            // { id: 'a', pitch: -5, yaw: -50, text: 'Info Hotspot 1' },
            // { id: 'b', pitch: -5, yaw: 50, text: 'Info Hotspot 2' },
            // { id: 'c', pitch: -5, yaw: 75, text: 'Info Hotspot 3' },
            { id: 'next',id1:2,  pitch: -10, yaw: 50, text: 'Next Scene pic3', isNextScene: true },
            {id: 'prev',id1:3, pitch: -40, yaw: 265, text: 'prev Scene1 pic5', isPrevScene: true }, 
          ],
        },
        {
          id: 2,
          image: Pic5,
          hotspots: [
            // { id: 'a', pitch: 25, yaw: -75, text: 'Info Hotspot 3' },
            // { id: 'b', pitch: -20, yaw: 5, text: 'Info Hotspot 4' },
            // { id: 'c', pitch: 15, yaw: 150, text: 'Info Hotspot 5' },
          
            { id: 'next',id1:4,  pitch: -15, yaw: 5, text: 'Next Scene', isNextScene: true },
            {id: 'prev',id1:1, pitch: -60, yaw: 260, text: 'prev Scene1', isPrevScene: true }, 
      
          ],
        },
        {
          id: 3,
          image: Pic3,
          hotspots: [
            // { id: 'a', pitch: 25, yaw: -75, text: 'Info Hotspot 3' },
            // { id: 'b', pitch: -18, yaw: 5, text: 'Info Hotspot 4' },
            // { id: 'c', pitch: 18, yaw: 160, text: 'Info Hotspot 4' },    
            { id: 'next',id1:1,  pitch: -85, yaw: 160, text: 'Next Scene', isNextScene: true },
            {id: 'prev',id1:6, pitch: -85, yaw: 265, text: 'prev Scene', isPrevScene: true }, 
          ],
        },
        {
          id: 4,
          image: Pic6,
          hotspots: [
            // { id: 'a', pitch: 25, yaw: -75, text: 'Info Hotspot 3' },
            // { id: 'b', pitch: -18, yaw: 5, text: 'Info Hotspot 4' },
            // { id: 'c', pitch: 18, yaw: 160, text: 'Info Hotspot 4' },    
            { id: 'next',id1:5,  pitch: -15, yaw: 55, text: 'Next Scene', isNextScene: true },
            {id: 'prev',id1:2,pitch: -35, yaw:260, text: 'prev Scene1', isPrevScene: true }, 
          ],
        },
        {
          id: 5,
          image: Pic7,
          hotspots: [
            { id: 'a', pitch: -15, yaw: 95, text: 'Info Hotspot 3' },
            // { id: 'b', pitch: -18, yaw: 5, text: 'Info Hotspot 4' },
            // { id: 'c', pitch: 18, yaw: 160, text: 'Info Hotspot 4' },    
            { id: 'next',id1:5,  pitch: -15, yaw: 45, text: 'Next Scene', isNextScene: true },
            {id: 'prev',id1:4,pitch: -55, yaw: 265, text: 'prev Scene1', isPrevScene: true }, 
          ],
        },
        {
          id: 6,
          image: Pic2,
          hotspots: [
            // { id: 'a', pitch: 25, yaw: -75, text: 'Info Hotspot 3' },
            // { id: 'b', pitch: -18, yaw: 5, text: 'Info Hotspot 4' },
            // { id: 'c', pitch: 18, yaw: 160, text: 'Info Hotspot 4' },    
            { id: 'next',id1:3,  pitch: -8, yaw: 35, text: 'Next Scene', isNextScene: true },
            {id: 'prev',id1:7,pitch: -5, yaw: 45, text: 'prev Scene1', isPrevScene: true }, 
          ],
        },
        {
          id: 7,
          image: Pic1,
          hotspots: [
            { id: 'a', pitch: 25, yaw: -75, text: 'Info Hotspot 3' },
            { id: 'b', pitch: -18, yaw: 5, text: 'Info Hotspot 4' },
            { id: 'c', pitch: 18, yaw: 160, text: 'Info Hotspot 4' },    
            { id: 'next',id1:6,  pitch: -8, yaw: 35, text: 'Next Scene', isNextScene: true },
            {id: 'prev',id1:7,pitch: -5, yaw: 45, text: 'prev Scene1', isPrevScene: true }, 
          ],
        },
      ];
    
      const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
      const [transitionStyle, setTransitionStyle] = useState({ transform: "scale(1)", transition: "transform 1.5s ease-in-out" });
    
     
    

    const handleSceneChange = (targetSceneId) => {
      setTransitionStyle({ transform: "scale(1.3)", transition: "transform 1.5s ease-in-out" });
    
      setTimeout(() => {
        setCurrentSceneIndex(() => {
          const newSceneIndex = scenes.findIndex(scene => scene.id === targetSceneId);
          return newSceneIndex !== -1 ? newSceneIndex : currentSceneIndex; // Only change if valid scene is found
        });
    
        setTransitionStyle({ transform: "scale(1)", transition: "transform 0.1s ease-in-out" });
      }, 1500);
    };
    
    // Inside your PannellumReact component:
    <PannellumReact
      image={scenes[currentSceneIndex].image}
      hotspots={scenes[currentSceneIndex].hotspots}
      onSceneChange={handleSceneChange} // Now supports scene ID navigation
    />
    

      return (
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
          <div style={{ ...transitionStyle, position: "absolute", width: "100%", height: "100%" }}>
            <PannellumReact
              image={scenes[currentSceneIndex].image}
              hotspots={scenes[currentSceneIndex].hotspots}
              onSceneChange={handleSceneChange}
            />
          </div>
        </div>
      );
    };  


export default Mumbai;



