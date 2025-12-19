import axios from 'axios';

const api = axios.create({
  baseURL: '/cms/api', 
});


export const cmsApi = {
  async getProjects() {
    const { data } = await api.get('/projects');
    return data;
  },

  async getCompanies() {
    const { data } = await api.get('/companies');
    return data;
  },

  async getProjectById(id) {
    const { data } = await api.get(`/projects/${id}`);
    return data;
  }

};