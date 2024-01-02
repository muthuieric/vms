import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddTmModal from "./AddTmModal";
import UpdateTmModal from "./UpdateTmModal";
import { getTms, deleteTms } from '../../services/TmsService';


const TmsList = () => {
  const [tms, setTms] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editTms, setEditTms] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (tms.length && !isUpdated) {
      return;
    }
    getTms()
      .then(data => {
        if (mounted) {
          setTms(data);
        }
      });
    return () => {
      mounted = false;
      setIsUpdated(false);
    };
  }, [isUpdated]);

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



  const handlePrint = () => {
    window.print();
  };


  return (
    <div className="container-fluid side-container">
      <div className="row side-row">
        <header className='flex justify-between '>
          <h2 className='text-2xl font-bold text-center pt-2'>Tms</h2>
          <ButtonToolbar className='flex space-x-2'>
            <Button className="" variant="primary" onClick={handleAdd}>
              Add Tm
            </Button>
            <Button
              onClick={handlePrint}
              className=""
            >
              Print
            </Button>
            <AddTmModal show={addModalShow} setUpdated={setIsUpdated} onHide={() => setAddModalShow(false)} />
          </ButtonToolbar>
        </header>


        <p id="manage tm"></p>
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
              {tms.map((tm) => (
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
       
      </div>
    </div>
  );
};

export default TmsList;
