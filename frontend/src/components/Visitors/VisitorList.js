import React, { useEffect, useState } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddVisitorModal from "./AddVisitorModal";
import UpdateVisitorModal from "./UpdateVisitorModal";
import { getVisitors, deleteVisitor } from '../../services/VisitorsService';
import Pagination from '../Pagination';

const VisitorsList = () => {
  const [visitors, setVisitors] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editVisitor, setEditVisitor] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    let mounted = true;
    if (visitors.length && !isUpdated) {
      return;
    }
    getVisitors()
      .then(data => {
        if (mounted) {
          setVisitors(data);
        }
      });
    return () => {
      mounted = false;
      setIsUpdated(false);
    };
  }, [isUpdated, visitors.length]);

  const handleUpdate = (e, visitor) => {
    e.preventDefault();
    setEditModalShow(true);
    setEditVisitor(visitor);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true);
  };

  const handleDelete = (e, id) => {
    if (window.confirm('Are you sure?')) {
      e.preventDefault();
      deleteVisitor(id)
        .then((result) => {
          alert(result);
          setIsUpdated(true);
        })
        .catch(() => {
          alert("Failed to Delete Visitor");
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

  const pageCount = Math.ceil(visitors.length / itemsPerPage);

  return (
    <div className="container-fluid side-container">
      <div className="row side-row">
        <header className='flex justify-between '>
          <h2 className='text-2xl font-bold text-center pt-2'>Visitors</h2>
          <ButtonToolbar className='flex space-x-2'>
            <Button className="" variant="primary" onClick={handleAdd}>
              Add Visitor
            </Button>
            <Button onClick={handlePrint} className="">
              Print
            </Button>
            <AddVisitorModal show={addModalShow} setUpdated={setIsUpdated} onHide={() => setAddModalShow(false)} />
          </ButtonToolbar>
        </header>

        <div className="overflow-x-auto ">
          <Table striped bordered hover className="react-bootstrap-table w-full " id="dataTable">
            <thead className="sticky top-0 bg-gray-800 z-50 text-white">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>ID Number</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Red Flag</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visitors.slice(offset, offset + itemsPerPage).map((visitor) => (
                <tr key={visitor.id}>
                  <td>{visitor.id}</td>
                  <td>{visitor.Name}</td>
                  <td>{visitor.Id_number}</td>
                  <td>{visitor.Phone}</td>
                  <td>{visitor.Email}</td>
                  <td>{visitor.Red_flag ? 'Yes' : 'No'}</td>
                  <td>
                    <Button className="mr-2" onClick={(event) => handleUpdate(event, visitor)}>
                      <FaEdit />
                    </Button>
                    <Button className="mr-2" variant="danger" onClick={(event) => handleDelete(event, visitor.id)}>
                      <RiDeleteBin5Line />
                    </Button>
                    <UpdateVisitorModal show={editModalShow} visitor={editVisitor} setUpdated={setIsUpdated} onHide={() => setEditModalShow(false)} />
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

export default VisitorsList;
