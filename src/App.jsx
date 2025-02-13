import React from 'react';
// import PanoViewer from './PanoViewer'; 
// import Pano from './Pano.jpg'; 
// import Pano1 from './Panocopy.jpg'; 
// import BPCLlogo from './Components/BPCLLogo.jpg';
// import Main from './Components/Main';
import FirstMain from './Components/FirstMain';
// import Curtains from './Components/Curtains';
// import PanoViewer from './Panoexp';
// import CurtainAnimation from './Components/CurtainAnimation';

function App() {
  // const [stage, setStage] = useState(0); // 0: Intro, 1: Guest1, 2: Guest2, 3: End
  // const [hotspotHovered, setHotspotHovered] = useState(null); // Track hovered hotspot
  // const [isClicked, setIsClicked] = useState(false); // Track click on hotspot
  // const hotspots = [
  //   {
  //     latitude: 25, 
  //     longitude: 300, 
  //     title: 'Hotspot 1',
  //     description: 'This is the first hotspot.',
  //     image: Pano1, 
  //     tooltip: 'This is a tooltip for Hotspot 1',
      
  //   },
  //   { 
  //     latitude: 7, 
  //     longitude: 270, 
  //     title: 'Hotspot 2',
  //     description: 'This is the second hotspot.',
  //     image: BPCLlogo, 
  //     tooltip: 'This is a tooltip for Hotspot 2',
     
  //   },
  //   // Add more hotspots as needed
  // ];

  return (
  
        <div>
          {/* <div>
            <PanoViewer image={Pano} hotspots={hotspots} />
          </div> */}
        <div>
        
{/* <Curtains/>   */}
{/* <CurtainAnimation/> */}
        <FirstMain/>

        </div>


         </div>
   
  );
}

export default App;