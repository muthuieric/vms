import axios from 'axios';

const API_BASE_URL = "https://django-render-vms.onrender.com/visitors/";

export function getVisitors() {
  return axios.get(API_BASE_URL)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching Visitors:', error);
      throw error;
    });
}

export function deleteVisitor(id) {
  return axios.delete(`${API_BASE_URL}${id}/`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error(`Error deleting Visitor with id ${id}:`, error);
      throw error;
    });
}

export function addVisitor(visitor) {
  return axios.post(API_BASE_URL, {
    id: null,
    Name: visitor.Name,
    Id_number: visitor.Id_number,
    Phone: visitor.Phone,
    Email: visitor.Email,
    Red_flag: visitor.Red_flag
  })
    .then(response => response.data)
    .catch(error => {
      console.error('Error adding Visitor:', error);
      throw error;
    });
}

export function updateVisitor(id, visitor) {
  return axios.put(`${API_BASE_URL}${id}/`, {
    Name: visitor.Name,
    Id_number: visitor.Id_number,
    Phone: visitor.Phone,
    Email: visitor.Email,
    Red_flag: visitor.Red_flag
  })
    .then(response => response.data)
    .catch(error => {
      console.error(`Error updating Visitor with id ${id}:`, error);
      throw error;
    });
}
