import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import BPCLLogo from './BPCLLogo.jpg';
const Main= () => {
  const [showDetails, setShowDetails] = useState(null);
    const navigate = useNavigate();
  const handleShowDetails = (location) => {
    setShowDetails(location);
  };

  const handleCloseDetails = () => {
    setShowDetails(null);
  };

  const handleInaugurate = (location) => {
    // Redirect to the specific location page
    navigate(`/${location.name.toLowerCase()}`);
  };

  const locations = [
    {
      name: 'Jobner',
      description: 'The welfare facility at Jobner is now operational, offering essential services to the local community.',
      inaugurationMessage: 'We are excited to officially inaugurate the welfare facility in Jobner, which will serve as a center for healthcare and community support.',
    },
    {
      name: 'Kota',
      description: 'The welfare facility in Kota aims to enhance local infrastructure and provide better resources for the population.',
      inaugurationMessage: 'The Kota welfare facility marks a significant step towards improving the region’s social and healthcare services.',
    },
    {
      name: 'Bharatpur',
      description: 'The Bharatpur welfare facility will focus on providing educational and healthcare services to underserved communities.',
      inaugurationMessage: 'With great pride, we announce the inauguration of the Bharatpur welfare facility, dedicated to improving lives in the area.',
    },
    {
      name: 'Salawas',
      description: 'Salawas now has its own welfare facility that will contribute to the region’s overall development and community welfare.',
      inaugurationMessage: 'The Salawas welfare facility is now open, providing vital services and contributing to the region’s growth.',
    },
  ];

  return (
    <div className="inauguration-container" >
      <div >
      <h2 style={{width:'80%', textAlign:'center', alignItems:'center', justifySelf:'center'}}>
        Inauguration of Welfare Facilities at Operational Locations
        </h2>
      <div style={{paddingBottom:'80px'}}><img className='BPCLlogo' src={BPCLLogo} alt='bpcl' />
      </div>
      </div>
      <div className="locations">
        {locations.map((location, index) => (
          <div key={index} className="location">
            <h2>{location.name}</h2>
            <p>{location.description}</p>
            <button onClick={() => handleShowDetails(location)} style={{margin:'10px'}}>View Details</button>
            <button onClick={() => handleInaugurate(location)}>Inaugurate</button>

          </div>
        ))}
      </div>

      {showDetails && (
        <div className="details-popup">
          <div className="popup-content">
            <h2>{showDetails.name}</h2>
            <p>{showDetails.description}</p>
            <p><strong>Inauguration Message:</strong> {showDetails.inaugurationMessage}</p>
            <button onClick={handleCloseDetails}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
