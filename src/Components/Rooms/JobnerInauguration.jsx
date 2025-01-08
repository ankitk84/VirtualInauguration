import React from 'react';
import PanoViewer from '../../Panoexp';
import Pano from '../../Pano.jpg';
import Pano1 from '../../Pano.jpg';
function JobnerInauguration(){
  
  // const containerWidth = 800;
  // const containerHeight = 600;
  // const [stage, setStage] = useState(0); // 0: Intro, 1: Guest1, 2: Guest2, 3: End
  //   const [hotspotHovered, setHotspotHovered] = useState(null); // Track hovered hotspot
  //   const [isClicked, setIsClicked] = useState(false); // Track click on hotspot
    const hotspots = [
      {
        latitude: 25, 
        longitude: 300, 
        title: 'Hotspot 1',
        description: 'This is the first hotspot.',
        image: Pano1, 
        tooltip: 'This is a tooltip for Hotspot 1',
        
      },
      { 
        latitude: 7, 
        longitude: 270, 
        title: 'Hotspot 2',
        description: 'This is the second hotspot.',
        image: Pano1, 
        tooltip: 'This is a tooltip for Hotspot 2',
       
      },
      // Add more hotspots as needed
    ];
  return (
    <div>
      {/* <h1>Inauguration of Welfare Facility at Jobner</h1> */}
      {/* <p>Details about the welfare facility at Jobner will go here.</p> */}
      <div>
            <PanoViewer image={Pano} hotspots={hotspots} />
          </div>
          {/* <PanoViewer
        image={Pano} // Replace with your panorama image path
        hotspots={hotspots}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
      /> */}
    </div>
  );
};

export default JobnerInauguration;
