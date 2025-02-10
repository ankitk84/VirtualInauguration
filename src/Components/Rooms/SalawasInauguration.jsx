import React from 'react';
// import PannellumReact  from "./Pannelum"
// import PannellumReact from './Pano11';
import Pano1 from "../../Pano.jpg"

import PannellumReact from './Pano12';

function SalawasInauguration (){
  const hotspots = [
    {
      id: 1,
      pitch: 10,  // Vertical angle in degrees
      yaw: 100,   // Horizontal angle in degrees
      text: "Info Hotspot 1",
    },
    {
      id: 2,
      pitch: -5,
      yaw: 45,
      text: "Info Hotspot 2",
    },
    {
      id: 3,
      pitch: 25,
      yaw: -75,
      text: "Info Hotspot 3",
    },
  ];
  
  
  return (
    <div>
      {/* <h1>Inauguration of Welfare Facility at salawas</h1> */}
      {/* <p>Details about the welfare facility at salawas will go here.</p> */}
      {/* <PannellumReact/> */}
      <PannellumReact image={Pano1} hotspots={hotspots} />

      
    </div>
  );
};

export default SalawasInauguration;
