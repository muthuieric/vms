import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/Navigation";
import Dashboard from './components/Dashboard/Dashboard';
import Home from "./components/Home";
import TmsList from "./components/Tms/TmsList";
import VisitorsList from './components/Visitors/VisitorList';
import VisitsList from './components/Visits/VisitsList';
import EmployeesList from './components/Employees/EmployeeList';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
         <Route exact path="/" element={<Home/>} />
         <Route exact path="/dashboard" element={<Dashboard/>} />
         <Route path="/tms" element={<TmsList/>} />
         <Route path="/visitors" element={<VisitorsList/>} />
         <Route path="/visits" element={<VisitsList/>} />
         <Route path="/employees" element={<EmployeesList/>} />


       </Routes>
    </BrowserRouter>
  );
};

export default App;