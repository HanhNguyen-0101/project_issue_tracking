import { baseService } from "./baseService";

class Project extends baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  getProjectDetail = (id) => {
    return this.get(`Project/getProjectDetail?id=${id}`);
  };

  editProjectDetail = (project) => {
    return this.put(`Project/updateProject?projectId=${project.id}`, project);
  }

  deleteProjectDetail = (projectId) => {
    return this.delete(`Project/deleteProject?projectId=${projectId}`);
  }

  getAllCategory = () => {
    return this.get('ProjectCategory');
  };

  createProjectToken = (project) => {
    return this.post('Project/createProjectAuthorize', project);
  };

  getAllProject = () => {
    return this.get('Project/getAllProject');
  };

  assignUserToProject = (data) => {
    return this.post('Project/assignUserProject', data);
  };

  removeUserFromProject = (data) => {
    return this.post('Project/removeUserFromProject', data);
  }
}
export const ProjectService = new Project();
