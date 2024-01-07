import React, { useEffect, useState } from 'react';
import { Table, Button, ButtonToolbar, Form, InputGroup } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddTmModal from "./AddTmModal";
import UpdateTmModal from "./UpdateTmModal";
import { getTms, deleteTms } from '../../services/TmsService';
import Pagination from '../Pagination';

const TmsList = () => {
  const [tms, setTms] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editTms, setEditTms] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [filteredTms, setFilteredTms] = useState([]);
  const [search, setSearch] = useState('');



  
  useEffect(() => {
    let mounted = true;
    if (tms.length && !isUpdated) {
      return;
    }
    getTms()
      .then(data => {
        if (mounted) {
          setTms(data);
          setFilteredTms(data);
        }
      });
    return () => {
      mounted = false;
      setIsUpdated(false);
    };
  }, [isUpdated, tms.length]); 

  useEffect(() => {
    setFilteredTms(tms.filter((tm) => {
      return (
        (search.toLowerCase() === '' || tm.Name.toLowerCase().includes(search)));
    }));
  }, [search, tms]);
  
  const handleUpdate = (e, tm) => {
    e.preventDefault();
    setEditModalShow(true);
    setEditTms(tm);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true);
  };

  const handleDelete = (e, id) => {
    if (window.confirm('Are you sure?')) {
      e.preventDefault();
      deleteTms(id)
        .then((result) => {
          alert(result);
          setIsUpdated(true);
        })
        .catch((error) => {
          alert("Failed to Delete Tm");
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

  const pageCount = Math.ceil(tms.length / itemsPerPage);

  return (
    <div className="container-fluid side-container">
      <div className="row side-row">
      <header className='flex flex-col md:flex-row justify-between items-center p-2 md:p-2'>
      <h2 className='text-2xl font-bold text-center md:text-left  mb-3 md:mb-0'>Tms</h2>
      <ButtonToolbar className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2'>
        <Button  className="md:inline-block" variant="primary" onClick={handleAdd}>
          Add Tm
        </Button>
        <Button onClick={handlePrint} className="md:inline-block">
          Print
        </Button>
        <AddTmModal show={addModalShow} setUpdated={setIsUpdated} onHide={() => setAddModalShow(false)} />
      </ButtonToolbar>
    </header>


    <Form>
          <InputGroup className='my-3'>
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search'
            />
          </InputGroup>
    </Form>


        <div className="overflow-x-auto ">
        <Table striped bordered hover className="react-bootstrap-table w-full " id="dataTable">

            <thead className="sticky top-0 bg-gray-800 z-50 text-white">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTms.slice(offset, offset + itemsPerPage).map((tm) => (
                <tr key={tm.id}>
                  <td>{tm.id}</td>
                  <td>{tm.Name}</td>
                  <td>{tm.Phone}</td>
                  <td>{tm.Email}</td>
                  <td>
                    <Button className="mr-2" onClick={(event) => handleUpdate(event, tm)}>
                      <FaEdit />
                    </Button>
                    <Button className="mr-2" variant="danger" onClick={(event) => handleDelete(event, tm.id)}>
                      <RiDeleteBin5Line />
                    </Button>
                    <UpdateTmModal show={editModalShow} tm={editTms} setUpdated={setIsUpdated} onHide={() => setEditModalShow(false)} />
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

export default TmsList;
