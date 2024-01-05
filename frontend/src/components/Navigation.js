import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import {NavLink} from 'react-router-dom';
import {Navbar} from 'react-bootstrap';
import "../App.css";


const Navigation = () => {
  return (
    <div>
    <Navbar bg="dark" variant="dark" expand="lg" id="my-nav">
        <Navbar.Brand className="pl-10" href="/">
            Visitors Management System
        </Navbar.Brand>
    </Navbar>
    <div className='sidebar'>
    <CDBSidebar className=""textColor="#333" backgroundColor="#f0f0f0">
        <CDBSidebarHeader prefix={<i className="fa fa-bars " />}>
          Navigation
        </CDBSidebarHeader>
        <CDBSidebarContent >
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tms" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list">Tms List</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/visitors" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Visitors</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/visits" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="users">Visits</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/employees" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="users">Employees</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
    </div>
  );
};

export default Navigation;