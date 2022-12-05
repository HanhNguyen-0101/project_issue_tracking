import { all } from "redux-saga/effects";
import * as UserSaga from "./UserSaga";
import * as ProjectSaga from "./ProjectSaga";
import * as IssueSaga from "./IssueSaga";
import * as CommentSaga from "./CommentSaga";

function* rootSaga() {
  yield all([
    UserSaga.followUserLoginSaga(),
    UserSaga.followGetUserByKeywordSaga(),
    UserSaga.followGetAllUserSaga(),
    UserSaga.followUpdateUserSaga(),
    UserSaga.followDeleteUserSaga(),
    UserSaga.followSearchUserByKeywordSaga(),
    UserSaga.followRegisterUserSaga(),

    ProjectSaga.followGetAllCategorySaga(),
    ProjectSaga.followCreateProjectSaga(),
    ProjectSaga.followGetAllProjectSaga(),
    ProjectSaga.followAssignUserToProjectSaga(),
    ProjectSaga.followRemoveUserFromProjectSaga(),
    ProjectSaga.followEditProjectDetailSaga(),
    ProjectSaga.followDeleteProjectDetailSaga(),
    ProjectSaga.followGetProjectDetailSaga(),

    IssueSaga.followCreateIssueDetailSaga(),
    IssueSaga.followDeleteIssueDetailSaga(),
    IssueSaga.followGetIssueDetailSaga(),
    IssueSaga.followUpdateIssueDetailSaga(),
    IssueSaga.followGetAllPrioritySaga(),
    IssueSaga.followGetAllStatusSaga(),
    IssueSaga.followGetAllTypeTaskSaga(),
    IssueSaga.followUpdateStatusIssueSaga(),

    CommentSaga.followDeleteCommentSaga(),
    CommentSaga.followGetCommentSaga(),
    CommentSaga.followInsertCommentSaga(),
    CommentSaga.followUpdateCommentSaga(),
  ]);
}

export default rootSaga;
