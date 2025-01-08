import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobnerInauguration from './Rooms/JobnerInauguration';
import KotaInauguration from './Rooms/KotaInauguration';
import BharatpurInauguration from './Rooms/BharatpurInauguration';
import SalawasInauguration from './Rooms/SalawasInauguration';
import Main from './Main';
const FirstMain = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} /> 
        <Route path="/jobner" element={<JobnerInauguration />} />
        <Route path="/kota" element={<KotaInauguration />} />
        <Route path="/bharatpur" element={<BharatpurInauguration />} />
        <Route path="/salawas" element={<SalawasInauguration/>} />
      </Routes>
    </Router>
  );
};

export default FirstMain;
