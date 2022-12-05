import { baseService } from "./baseService";

class Issue extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    getIssueDetail = (issueId) => {
        return this.get(`Project/getTaskDetail?taskId=${issueId}`);
    }

    deleteIssue = (issueId) => {
        return this.delete(`Project/removeTask?taskId=${issueId}`);
    }

    updateIssue = (issue) => {
        return this.post('Project/updateTask', issue);
    }

    createIssue = (issue) => {
        return this.post('Project/createTask', issue);
    }

    getAllPriority = () => {
        return this.get('Priority/getAll?id=0');
    }

    getAllStatus = () => {
        return this.get('Status/getAll');
    }

    getAllTypeTask = () => {
        return this.get('TaskType/getAll');
    }

    updateStatusIssue = (data) => {
        return this.put('Project/updateStatus', data);
    }
}

export const IssueService = new Issue();