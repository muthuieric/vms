import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/tms/';

export function getTms() {
  return axios.get(API_BASE_URL)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching Tms:', error);
      throw error;
    });
}

export function deleteTms(id) {
  return axios.delete(`${API_BASE_URL}${id}/`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error(`Error deleting Tm with id ${id}:`, error);
      throw error;
    });
}
export function addTm(tm) {
  return axios.post(API_BASE_URL, {
    id: null,
    Name: tm.Name.value,
    Phone: tm.Phone.value,
    Email: tm.Email.value
  })
    .then(response => response.data)
    .catch(error => {
      console.error('Error adding Tm:', error);
      throw error;
    });
}
// export function updateTm(id, tm) {
//   return axios.put('http://127.0.0.1:8000/tms/' + id + '/', {
//     Name:tm.Name.value,
//     Phone:tm.Phone.value,
//     Email:tm.Email.value
//   })
//    .then(response => response.data)
// }

export function updateTm(id, tm) {
  return axios.put(`${API_BASE_URL}${id}/`, {
    Name: tm.Name.value,
    Phone: tm.Phone.value,
    Email: tm.Email.value
  })
    .then(response => response.data)
    .catch(error => {
      console.error(`Error updating Tm with id ${id}:`, error);
      throw error;
    });
}