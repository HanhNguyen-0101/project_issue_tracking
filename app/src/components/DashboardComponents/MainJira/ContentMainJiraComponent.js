import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Tooltip, Avatar } from "antd";
import {
  getIssueDetail,
  updateStatusIssue,
} from "../../../redux/actions/IssueAction";
import {
  priorityIcon,
  taskTypeDetailIcon,
} from "../../../utils/render/taskUtil";
import { setContentEditIssueDrawer } from "../../../redux/actions/ModalAction";
import EditIssueModal from "../../Modals/EditIssueModal";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { getComment } from "../../../redux/actions/CommentAction";
import { generateFromString } from "generate-avatar";

export default function ContentMainJiraComponent() {
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
    let { projectId, taskId } = JSON.parse(result.draggableId);

    let { source, destination } = result;
    if (!result.destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    dispatch(
      updateStatusIssue({
        taskId: taskId,
        statusId: destination.droppableId,
        projectId: projectId,
      })
    );
  };
  const renderTask = (tasks) => {
    return tasks?.map((task, index) => {
      return (
        <Draggable
          key={task.taskId.toString()}
          index={index}
          draggableId={JSON.stringify({
            projectId: task.projectId,
            taskId: task.taskId,
          })}
        >
          {(provided) => {
            return (
              <li
                className="list-group-item border m-1 rounded drop-shadow-md"
                data-toggle="modal"
                data-target="#infoModal"
                style={{ cursor: "pointer" }}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                key={index}
                onClick={() => {
                  dispatch(getIssueDetail(task.taskId));
                  dispatch(getComment(task.taskId));
                  dispatch(setContentEditIssueDrawer(<EditIssueModal />));
                }}
              >
                <p>{task.taskName}</p>
                <div className="block" style={{ display: "flex" }}>
                  <div className="block-left">
                    <Space>
                      {taskTypeDetailIcon(task.taskTypeDetail?.id)}
                      {priorityIcon(task.priorityTask?.priorityId)}
                    </Space>
                  </div>
                  <div className="block-right">
                    <div className="avatar-group" style={{ display: "flex" }}>
                      <Avatar.Group
                        maxCount={4}
                        size="64"
                        maxStyle={{
                          color: "#f56a00",
                          backgroundColor: "#fde3cf",
                        }}
                      >
                        {task.assigness?.map((av, idx) => {
                          return (
                            <Tooltip title={av.name} placement="top" key={idx}>
                              <Avatar src={`data:image/svg+xml;utf8,${generateFromString(av.avatar)}`} />
                            </Tooltip>
                          );
                        })}
                      </Avatar.Group>
                    </div>
                  </div>
                </div>
              </li>
            );
          }}
        </Draggable>
      );
    });
  };
  const renderStatusBlock = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {projectDetail.lstTask?.map((taskBlock, index) => {
          return (
            <Droppable key={index} droppableId={taskBlock.statusId}>
              {(provided) => {
                return (
                  <div
                    className="card col p-0 m-2"
                    key={index}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="card-header">
                      {taskBlock.statusName} {taskBlock.lstTaskDeTail?.length}
                    </div>
                    <ul className="list-group list-group-flush">
                      {renderTask(taskBlock.lstTaskDeTail)}
                    </ul>
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    );
  };
  return (
    <div className="content container-fluid">
      <div className="row">{renderStatusBlock()}</div>
    </div>
  );
}
