import axios from 'axios';

const API_BASE_URL = "https://django-render-vms.onrender.com/employees/";

export function getEmployees() {
  return axios.get(API_BASE_URL)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching Employees:', error);
      throw error;
    });
}

export function deleteEmployee(id) {
  return axios.delete(`${API_BASE_URL}${id}/`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error(`Error deleting Employee with id ${id}:`, error);
      throw error;
    });
}

export function addEmployee(employee) {
    return axios.post(API_BASE_URL, {
      id: null,
      Name: employee.Name,
      Job_title: employee.Job_title,
      Id_number: employee.Id_number,
      Phone: employee.Phone,
      Email: employee.Email,
    })
      .then(response => response.data)
      .catch(error => {
        console.error('Error adding Employee:', error);
        throw error;
      });
  }
  

export function updateEmployee(id, employee) {
  return axios.put(`${API_BASE_URL}${id}/`, {
    Name: employee.Name,
    Job_title: employee.Job_title,
    Phone: employee.Phone,
    Email: employee.Email
  })
    .then(response => response.data)
    .catch(error => {
      console.error(`Error updating Employee with id ${id}:`, error);
      throw error;
    });
}
