import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  Table,
  Button,
  ButtonToolbar,
  Form,
  InputGroup,
} from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import AddVisitModal from "./AddVisitModal";
import UpdateVisitModal from "./UpdateVisitModal";
import { getVisits, deleteVisit } from "../services/VisitsService";
import Pagination from "../Pagination";

const VisitsList = ({ isAuthenticated }) => {
  const [visits, setVisits] = useState([]);
  const [filteredVisits, setFilteredVisits] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editVisit, setEditVisit] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    let mounted = true;
    if (visits.length && !isUpdated) {
      return;
    }
    getVisits().then((data) => {
      if (mounted) {
        setVisits(data);
        setFilteredVisits(data);
      }
    });
    return () => {
      mounted = false;
      setIsUpdated(false);
    };
  }, [isUpdated, visits.length]);

  useEffect(() => {
    // Update filteredVisits when search or date changes
    setFilteredVisits(
      visits.filter((visit) => {
        const visitDate = new Date(visit.checkin).toLocaleDateString();
        const filterDate = new Date(dateFilter).toLocaleDateString();

        return (
          (search.toLowerCase() === "" ||
            visit.visitor.toLowerCase().includes(search)) &&
          (dateFilter === "" || visitDate === filterDate)
        );
      })
    );
  }, [search, dateFilter, visits]);

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
    if (window.confirm("Are you sure?")) {
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

  const pageCount = Math.ceil(filteredVisits.length / itemsPerPage);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      // second: 'numeric',
    };

    const date = new Date(dateString);
    return date.toLocaleString("en-US", options);
  };

  if (!isAuthenticated && !localStorage.getItem("access")) {
    return <Navigate to={"../login"} />;
  }

  return (
    <div className="container-fluid side-container">
      <div className="row side-row">
        <header className="flex flex-col md:flex-row justify-between items-center p-2 md:p-2">
          <h2 className="text-2xl font-bold text-center md:text-left  mb-3 md:mb-0">
            Visits
          </h2>
          <ButtonToolbar className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Button
              className="md:inline-block "
              variant="primary"
              onClick={handleAdd}
            >
              Add Visit
            </Button>
            <Button className="md:inline-block " onClick={handlePrint}>
              Print
            </Button>
            <AddVisitModal
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
            <Form.Control
              type="date"
              onChange={(e) => setDateFilter(e.target.value)}
              placeholder="Filter by Date"
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
              {filteredVisits
                .slice(offset, offset + itemsPerPage)
                .map((visit) => (
                  <tr key={visit.id}>
                    <td>{visit.id}</td>
                    <td>{visit.visitor}</td>
                    <td>{visit.host}</td>
                    <td>{visit.visit_type}</td>
                    <td>{visit.purpose}</td>
                    <td>{formatDate(visit.checkin)}</td>
                    <td>
                      {visit.checkout
                        ? formatDate(visit.checkout)
                        : "Not Checked Out"}
                    </td>
                    <td>
                      <Button
                        className="mr-2"
                        onClick={(event) => handleUpdate(event, visit)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        className="mr-2"
                        variant="danger"
                        onClick={(event) => handleDelete(event, visit.id)}
                      >
                        <RiDeleteBin5Line />
                      </Button>
                      <UpdateVisitModal
                        show={editModalShow}
                        visit={editVisit}
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

export default connect(mapStateToProps)(VisitsList);

