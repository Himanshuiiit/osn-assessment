import axios from "axios";

const API_URL = "http://localhost:4000/api/notes";

const getNotes = async (page = 1) => {
  const response = await axios.get(`${API_URL}?page=${page}`);
  return response.data;
};

const createNote = async (noteData) => {
  const response = await axios.post(API_URL, noteData);
  return response.data;
};

const updateNote = async (id, noteData) => {
  const response = await axios.put(`${API_URL}/${id}`, noteData);
  return response.data;
};

const deleteNote = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const services = { getNotes, createNote, updateNote, deleteNote };
export default services;
