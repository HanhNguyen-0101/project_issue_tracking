import { Tooltip, Avatar } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateFromString } from "generate-avatar";
import FormCreateIssue from "../../../components/Forms/FormCreateIssue/FormCreateIssue";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { setContentDrawer } from "../../../redux/actions/DrawerAction";
import { getProjectDetailApi } from "../../../redux/actions/ProjectAction";

export default function InfoMainJiraComponent({ id }) {
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const dispatch = useDispatch();
  const renderMember = () => {
    return (
      <Avatar.Group
        maxCount={7}
        size="large"
        maxStyle={{
          color: "#f56a00",
          backgroundColor: "#fde3cf",
        }}
      >
        {projectDetail.members?.map((member, idx) => {
          return (
            <Tooltip title={member.name} placement="top" key={idx}>
              <Avatar
                src={`data:image/svg+xml;utf8,${generateFromString(
                  member.avatar
                )}`}
              />
            </Tooltip>
          );
        })}
      </Avatar.Group>
    );
  };
  return (
    <div className="info grid items-center grid-cols-2 mb-4">
      <div className="flex items-center">
        <div className="avatar-group" style={{ display: "flex" }}>
          {renderMember()}
        </div>
        <span style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </span>
      </div>
      <div>
        <Button
          className="justify-center items-center py-3 float-right text-white border-none"
          style={{ display: "flex", backgroundColor: "#065fd4" }}
          onClick={() => {
            dispatch(
              setContentDrawer(<FormCreateIssue />, "CREATE ISSUE", true)
            );
            dispatch(getProjectDetailApi(Number(id)));
          }}
        >
          <PlusOutlined style={{ fontSize: 18 }} /> <span>Create Issue</span>
        </Button>
      </div>
    </div>
  );
}
