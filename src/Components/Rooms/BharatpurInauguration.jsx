import React from 'react';
// import CurtainAnimation from '../CurtainAnimation';
import PanoViewer from './NewPano';
import Pano1 from "../../Pano.jpg";
// import Pano2 from "../../pixels.jpg"
function BharatpurInauguration() {

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
          <PanoViewer image={Pano1} hotspots={hotspots} />
        </div>
        {/* <PanoViewer
      image={Pano} // Replace with your panorama image path
      hotspots={hotspots}
      containerWidth={containerWidth}
      containerHeight={containerHeight}
    /> */}
  </div>
);
  // return (
  //   <div>
  //     <div>
  //       <div>
  //       <h1>Inauguration of Welfare Facility at Jobner</h1>
  //       <p>Details about the welfare facility at Jobner will go here.</p>
  //       </div>
  //       <div>
  //         {/* <CurtainAnimation/> */}

  //       </div>
  //     </div>
  //   </div>
  // );
};

export default BharatpurInauguration;
