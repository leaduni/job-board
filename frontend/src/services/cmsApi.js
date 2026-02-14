import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_CMS_API_URL + "/api",
});

export const cmsApi = {
  async getProjects(params = {}) {
    const { data } = await api.get("/projects", { params });
    return data;
  },


  async getCompanies() {
    const { data } = await api.get("/companies");
    return data;
  },

  async createCompany(companyData) {
    const { data } = await api.post("/companies", companyData);
    return data;
  },

  async getProjectById(id) {
    const { data } = await api.get(`/projects/${id}`);
    return data;
  },

  async getCourses(params = {}) {
    const { data } = await api.get("/courses", { params });
    return data;
  },

  async getProveedores() {
    const { data } = await api.get("/proveedores");
    return data;
  },
};

