import axios from "axios";
const baseUrl = "http://localhost:3001/api";
// const baseUrl = "/api";

const getForms = () => {
  const request = axios.get(`${baseUrl}/getForms`);
  return request.then((response) => response.data);
};

const getForm = (id) => {
  const request = axios.get(`${baseUrl}/getForm/${id}`);
  return request.then((response) => response.data);
};

const createForm = (newForm) => {
  const request = axios.post(
    `${baseUrl}/uploadFileWithComputerVision`,
    newForm,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return request.then((response) => response.data);
};

const saveForm = (newForm) => {
  const request = axios.post(`${baseUrl}/saveFileInfo`, newForm);

  return request.then((response) => response.data);
};

const deleteForm = (name) => {
  const request = axios.delete(`${baseUrl}/deleteForm/${name}`);

  return request.then((response) => response.data);
};

const updateForm = (updateForm) => {
  const request = axios.put(`${baseUrl}/updateFileInfo`, updateForm);

  return request.then((response) => response.data);
};

export default {
  getForms,
  getForm,
  createForm,
  saveForm,
  deleteForm,
  updateForm,
};
