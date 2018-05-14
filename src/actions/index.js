import axios from 'axios';

export const GET_USERS = 'GET_USERS';
export const NEW_USER = 'NEW_USER';
export const SHOW_USER = 'SHOW_USER';
export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER = 'DELETE_USER'

const ROOT_URL = 'http://localhost:3000';

export function getUsers(){
  const request = axios.get(`${ROOT_URL}/users`);

  return {
    type: GET_USERS,
    payload: request
  }
}

// ACTION RESPONSIBLE FOR CREATING NEW USER

export function newUser(values, callback){
  const request = axios.post(`${ROOT_URL}/users`, values)
    .then(() => callback());

  return {
    type: NEW_USER,
    payload: request
  }
}

//ACTION RESPONSIBLE FOR DISPLAYING USER's DETAILS

export function showUser(id){
  const request = axios.get(`${ROOT_URL}/users/${id}`);

  return {
    type: SHOW_USER,
    payload: request
  }
}

//ACTION RESPONSIBLE FOR EDITING USER's DETAILS

export function editUser(id, values, callback){
  const request = axios.put(`${ROOT_URL}/users/${id}`, values)
    .then(window.location.href = '/');

  return {
    type: EDIT_USER,
    payload: request
  }
}

// ACTION RESPONSIBLE FOR DELETING USER

export function deleteUser(id, callback) {
  const request = axios.delete(`${ROOT_URL}/users/${id}`)
    .then(() => callback())

  return {
    type: DELETE_USER,
    id
  }
}
