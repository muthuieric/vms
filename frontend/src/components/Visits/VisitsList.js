import React, { useEffect, useState } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddVisitModal from "./AddVisitModal";
import UpdateVisitModal from "./UpdateVisitModal";
import { getVisits, deleteVisit } from '../../services/VisitsService';
import Pagination from '../Pagination';

const VisitsList = () => {
  const [visits, setVisits] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editVisit, setEditVisit] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    let mounted = true;
    if (visits.length && !isUpdated) {
      return;
    }
    getVisits()
      .then(data => {
        if (mounted) {
          setVisits(data);
        }
      });
    return () => {
      mounted = false;
      setIsUpdated(false);
    };
  }, [isUpdated, visits.length]);

  const handleUpdate = (e, visit) => {
    e.preventDefault();
    setEditModalShow(true);
    setEditVisit(visit);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true);
  };

  const handleDelete = (e, id) => {
    if (window.confirm('Are you sure?')) {
      e.preventDefault();
      deleteVisit(id)
        .then((result) => {
          alert(result);
          setIsUpdated(true);
        })
        .catch(() => {
          alert("Failed to Delete Visit");
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

  const pageCount = Math.ceil(visits.length / itemsPerPage);

  return (
    <div className="container-fluid side-container">
      <div className="row side-row">
        <header className='flex justify-between '>
          <h2 className='text-2xl font-bold text-center pt-2'>Visits</h2>
          <ButtonToolbar className='flex space-x-2'>
            <Button className="" variant="primary" onClick={handleAdd}>
              Add Visit
            </Button>
            <Button onClick={handlePrint} className="">
              Print
            </Button>
            <AddVisitModal show={addModalShow} setUpdated={setIsUpdated} onHide={() => setAddModalShow(false)} />
          </ButtonToolbar>
        </header>

        <div className="overflow-x-auto ">
          <Table striped bordered hover className="react-bootstrap-table w-full " id="dataTable">
            <thead className="sticky top-0 bg-gray-800 z-50 text-white">
              <tr>
                <th>ID</th>
                <th>Visitor Name</th>
                <th>Host Name</th>
                <th>Visit Type</th>
                <th>Purpose</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visits.slice(offset, offset + itemsPerPage).map((visit) => (
                <tr key={visit.id}>
                  <td>{visit.id}</td>
                  <td>{visit.visitor}</td>
                  <td>{visit.host}</td>
                  <td>{visit.visit_type}</td>
                  <td>{visit.purpose}</td>
                  <td>{visit.checkin}</td>
                  <td>{visit.checkout || 'Not Checked Out'}</td>
                  <td>
                    <Button className="mr-2" onClick={(event) => handleUpdate(event, visit)}>
                      <FaEdit />
                    </Button>
                    <Button className="mr-2" variant="danger" onClick={(event) => handleDelete(event, visit.id)}>
                      <RiDeleteBin5Line />
                    </Button>
                    <UpdateVisitModal show={editModalShow} visit={editVisit} setUpdated={setIsUpdated} onHide={() => setEditModalShow(false)} />
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

export default VisitsList;
