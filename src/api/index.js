import axios from 'axios';

const API_BASE_URL = window.ENV.API_URL;//TODO
const BEARER = 'Bearer ';
const BEARER_TOKEN = localStorage.getItem("react-token");
const token = `${BEARER}${BEARER_TOKEN}`;

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token,
    'Access-Control-Allow-Origin': '*',
  },
});

export function fetchTasks() {
  return client.get('/tasks');
}

export function createTask(params) {
  return client.post('/tasks', params);
}

export function editTask(id, params) {
  return client.put(`/tasks/${id}`, params);
}

export function removeTask(id) {
  return client.delete(`/tasks/${id}`);
}