import React, { useState, useEffect } from 'react';
import PanoViewer from './PanoViewer'; 
import Pano from './Pano.jpg'; 
import Pano1 from './Panocopy.jpg'; 
function Room1 (){

    const [hotspotHovered, setHotspotHovered] = useState(null); // Track hovered hotspot
    const [isClicked, setIsClicked] = useState(false); // Track click on hotspot
      const hotspots = [
        {
          latitude: 25, 
          longitude: 300, 
          title: 'Hotspot 1',
          description: 'This is the first hotspot.',
          image: Pano1, 
          tooltip: 'This is a tooltip for Hotspot 1' 
        },
        { 
          latitude: 20, 
          longitude: 315, 
          title: 'Hotspot 2',
          description: 'This is the second hotspot.',
          image: Pano1, 
          tooltip: 'This is a tooltip for Hotspot 2' 
        },
        // Add more hotspots as needed
      ];

    return (

        <div>
 <div>
          <PanoViewer  image={Pano} hotspots={hotspots} /> 
        </div>
        </div>

    );

};