import React from 'react';

// import Presentation from './Presentation11.gif';
import VideoWithConfetti from '../VideoWithConfetti';
function KotaInauguration (){
  return (
    <>
    <div style={{display:'flex'}} >
    <div style={{width:'50%', padding:"50px"}}>
      <h2>Inauguration of Welfare Facility at Jobner</h2>
      <p>Details about the welfare facility at Jobner will go here.</p>
    </div>
    <div style={{padding:'50px'}}> 
      {/* <img src={Presentation} alt="gif"/> */}
      <VideoWithConfetti/>
    </div>
    
    </div>

    
    {/* <PanoViewer
        image={Pano} // Replace with your panorama image path
        hotspots={hotspots}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
      /> */}
    
    </>
    
  );
};

export default KotaInauguration;
