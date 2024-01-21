import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Button, ButtonToolbar, Form, InputGroup } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddEmployeeModal from './AddEmployeeModal';
import UpdateEmployeeModal from './UpdateEmployeeModal';
import { getEmployees, deleteEmployee } from '../services/EmployeesService';
import Pagination from '../Pagination';

const EmployeesList = ({ isAuthenticated }) => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editEmployee, setEditEmployee] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [search, setSearch] = useState("");

  useEffect(() => {
    let mounted = true;
    if (employees.length && !isUpdated) {
      return;
    }
    getEmployees().then((data) => {
      if (mounted) {
        setEmployees(data);
        setFilteredEmployees(data);
      }
    });
    return () => {
      mounted = false;
      setIsUpdated(false);
    };
  }, [isUpdated, employees.length]);

  useEffect(() => {
    // Update filteredEmployees when search changes
    setFilteredEmployees(
      employees.filter((employee) =>
        employee.Name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, employees]);

  const handleUpdate = (e, employee) => {
    e.preventDefault();
    setEditModalShow(true);
    setEditEmployee(employee);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true);
  };

  const handleDelete = (e, id) => {
    if (window.confirm("Are you sure?")) {
      e.preventDefault();
      deleteEmployee(id)
        .then((result) => {
          alert(result);
          setIsUpdated(true);
        })
        .catch(() => {
          alert("Failed to Delete Employee");
        });
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;

  const handlePrint = () => {
    window.print();
  };

  const pageCount = Math.ceil(filteredEmployees.length / itemsPerPage);


   if (!isAuthenticated && !localStorage.getItem("access")) {
     return <Navigate to={"../login"} />;
   }

  return (
    <div className="container-fluid side-container">
      <div className="row side-row">
        <header className="flex flex-col md:flex-row justify-between items-center p-2 md:p-2">
          <h2 className="text-2xl font-bold text-center md:text-left  mb-3 md:mb-0">
            Employees
          </h2>
          <ButtonToolbar className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Button
              className="md:inline-block"
              variant="primary"
              onClick={handleAdd}
            >
              Add Employee
            </Button>
            <Button className="md:inline-block" onClick={handlePrint}>
              Print
            </Button>
            <AddEmployeeModal
              show={addModalShow}
              setUpdated={setIsUpdated}
              onHide={() => setAddModalShow(false)}
            />
          </ButtonToolbar>
        </header>

        <Form>
          <InputGroup className="my-3">
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />
          </InputGroup>
        </Form>

        <div className="overflow-x-auto ">
          <Table
            striped
            bordered
            hover
            className="react-bootstrap-table w-full "
            id="dataTable"
          >
            <thead className="sticky top-0 bg-gray-800 z-10 text-white">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Job Title</th>
                <th>ID Number</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees
                .slice(offset, offset + itemsPerPage)
                .map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.Name}</td>
                    <td>{employee.Job_title}</td>
                    <td>{employee.Id_number}</td>
                    <td>{employee.Phone}</td>
                    <td>{employee.Email}</td>
                    <td>
                      <Button
                        className="mr-2"
                        onClick={(event) => handleUpdate(event, employee)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        className="mr-2"
                        variant="danger"
                        onClick={(event) => handleDelete(event, employee.id)}
                      >
                        <RiDeleteBin5Line />
                      </Button>
                      <UpdateEmployeeModal
                        show={editModalShow}
                        employee={editEmployee}
                        setUpdated={setIsUpdated}
                        onHide={() => setEditModalShow(false)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps)(EmployeesList);


