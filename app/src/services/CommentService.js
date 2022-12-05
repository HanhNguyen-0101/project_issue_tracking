import { baseService } from "./baseService";

class Comment extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    getCommentByTaskID = (taskId) => {
        return this.get(`Comment/getAll?taskId=${taskId}`);
    }

    insertComment = (commentData) => {
        return this.post('Comment/insertComment', commentData);
    }

    updateComment = (id, contentComment) => {
        return this.put(`Comment/updateComment?id=${id}&contentComment=${contentComment}`, {id, contentComment});
    }

    deleteComment = (commentId) => {
        return this.delete(`Comment/deleteComment?idComment=${commentId}`);
    }
}

export const CommentService = new Comment();