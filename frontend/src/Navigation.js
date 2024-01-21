// import React from 'react';
// import {
//   CDBSidebar,
//   CDBSidebarContent,
//   CDBSidebarHeader,
//   CDBSidebarMenu,
//   CDBSidebarMenuItem,
// } from 'cdbreact';
// import {NavLink} from 'react-router-dom';
// import {Navbar} from 'react-bootstrap';
// import "./App.css";


// const Navigation = () => {
//   return (
//     <div className='pt-12'>
//     <Navbar className="bg-blue-600 text-white fixed-top " variant="dark" expand="lg" id="my-nav">
//         <Navbar.Brand className="pl-10 " href="/">
//             Visitors Management System
//         </Navbar.Brand>
//     </Navbar>
//     <div className='sidebar'>
//     <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
//         <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
//           Navigation
//         </CDBSidebarHeader>
//         <CDBSidebarContent >
//           <CDBSidebarMenu>
//             <NavLink exact to="/" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/dashboard" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="th-large">DashBoard</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/tms" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="list">Tms List</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/visitors" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="users">Visitors</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/visits" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="list">Visits</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/employees" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="user-tie">Employees</CDBSidebarMenuItem>
//             </NavLink>
//           </CDBSidebarMenu>
//         </CDBSidebarContent>
//       </CDBSidebar>
//     </div>
//     </div>
//   );
// };

// export default Navigation;