import React, { useEffect, useRef, useState } from "react";
import {
  deleteIssueDetail,
  getAllPriority,
  getAllTypeTask,
  updateIssueDetailField,
} from "../../redux/actions/IssueAction";
import { Editor } from "@tinymce/tinymce-react";
import { AutoComplete, Button, Select, Slider, Space, Input, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { priorityIcon, taskTypeDetailIcon } from "../../utils/render/taskUtil";
import { USER_LOGIN_STORE } from "../../utils/constants/settingSystem";
import {
  deleteComment,
  insertComment,
  updateComment,
} from "../../redux/actions/CommentAction";
const { Option } = AutoComplete;

export default function EditIssueModal(props) {
  const { priorities, taskCurrent, typeTasks } = useSelector(
    (state) => state.IssueReducer
  );
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const { comments } = useSelector((state) => state.CommentReducer);

  const dispatch = useDispatch();

  const [visibleEditDesc, setVisibleEditDesc] = useState(false);
  const [visibleComment, setVisibleComment] = useState({
    newComment: false,
  });

  const editorRef = useRef(null);
  const editorCommentRef = useRef(null);

  const {
    taskId,
    taskName,
    description,
    originalEstimate,
    timeTrackingSpent,
    timeTrackingRemaining,
    priorityId,
    projectId,
    statusId,
    typeId,
    listUserAsign,
  } = taskCurrent;

  let user = {};
  if (localStorage.getItem(USER_LOGIN_STORE)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN_STORE));
  }

  const memberOptions = projectDetail.members?.map((i) => {
    return { label: i.name, value: i.userId };
  });

  const handleChangeTaskField = ({ name, value }) => {
    dispatch(updateIssueDetailField(name, value));
  };

  const renderDescription = () => {
    if (visibleEditDesc) {
      return (
        <div>
          <Editor
            className="form-control"
            id="description"
            name="description"
            initialValue={description}
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          <Space className="mt-2 mb-4">
            <Button
              type="primary"
              onClick={() => {
                handleChangeTaskField({
                  name: "description",
                  value: editorRef.current?.getContent(),
                });
                setVisibleEditDesc(false);
              }}
            >
              Save
            </Button>
            <Button onClick={() => setVisibleEditDesc(false)}>Close</Button>
          </Space>
        </div>
      );
    } else {
      return (
        <p onClick={() => setVisibleEditDesc(true)}>
          <span dangerouslySetInnerHTML={{ __html: description }}></span>
        </p>
      );
    }
  };

  const renderComment = () => {
    return comments?.map((comment, idx) => {
      return (
        <div className="comment-item mt-2" key={idx}>
          <div className="display-comment" style={{ display: "flex" }}>
            <div className="avatar">
              <img src={comment.user?.avatar} alt={comment.user?.avatar} />
            </div>
            <div>
              <p style={{ marginBottom: 5, fontWeight: "bold" }}>
                {comment.user?.name}
              </p>
              {!visibleComment[comment.id] && (
                <p
                  className="m-0"
                  dangerouslySetInnerHTML={{ __html: comment.contentComment }}
                />
              )}
              {visibleComment[comment.id] && (
                <>
                  <Editor
                    className="form-control"
                    id={`commentContent${comment.id}`}
                    name={`commentContent${comment.id}`}
                    initialValue={comment.contentComment}
                    onInit={(evt, editor) =>
                      (editorCommentRef.current = editor)
                    }
                    init={{
                      height: 150,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                  <Space className="mt-2 mb-4">
                    <Button
                      type="primary"
                      onClick={() => {
                        dispatch(
                          updateComment(
                            comment.id,
                            editorCommentRef.current?.getContent(),
                            taskId
                          )
                        );
                        setVisibleComment({
                          ...visibleComment,
                          [comment.id]: false,
                        });
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() =>
                        setVisibleComment({
                          ...visibleComment,
                          [comment.id]: false,
                        })
                      }
                    >
                      Close
                    </Button>
                  </Space>
                </>
              )}
              {user.id === comment.user?.userId && (
                <Space>
                  <Button
                    type="text"
                    className="p-0"
                    onClick={() =>
                      setVisibleComment({
                        ...visibleComment,
                        [comment.id]: true,
                      })
                    }
                  >
                    <span style={{ color: "#929398" }}>Edit</span>
                  </Button>
                  <Popconfirm
                    title="Are you sure to delete this task?"
                    onConfirm={() => {
                      dispatch(deleteComment(comment.id, taskId));
                    }}
                    onCancel={() => {}}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="text" className="p-0">
                      <span style={{ color: "#929398" }}>Delete</span>
                    </Button>
                  </Popconfirm>
                </Space>
              )}
            </div>
          </div>
        </div>
      );
    });
  };

  const renderInputComment = () => {
    return (
      <>
        <div className="avatar">
          <img src={user?.avatar} alt={user?.avatar} />
        </div>
        <div className="input-comment mb-3">
          {!visibleComment.newComment && (
            <Input
              placeholder="Add a comment ..."
              onFocus={() =>
                setVisibleComment({ ...visibleComment, newComment: true })
              }
            />
          )}
          {visibleComment.newComment && (
            <>
              <Editor
                className="form-control"
                id="commentContent"
                name="commentContent"
                onInit={(evt, editor) => (editorCommentRef.current = editor)}
                init={{
                  height: 150,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
              <Space className="mt-2 mb-4">
                <Button
                  type="primary"
                  onClick={() => {
                    dispatch(
                      insertComment({
                        taskId,
                        contentComment: editorCommentRef.current?.getContent(),
                      })
                    );
                    setVisibleComment({ ...visibleComment, newComment: false });
                  }}
                >
                  Save
                </Button>
                <Button
                  onClick={() =>
                    setVisibleComment({ ...visibleComment, newComment: false })
                  }
                >
                  Close
                </Button>
              </Space>
            </>
          )}
        </div>
      </>
    );
  };

  useEffect(() => {
    dispatch(getAllPriority());
    dispatch(getAllTypeTask());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="modal-content">
      <div className="modal-header">
        <div className="task-title" style={{ marginLeft: -22 }}>
          <Select
            id="typeId"
            name="typeId"
            value={typeId}
            showArrow={false}
            bordered={false}
            showSearch={false}
            style={{ width: 120 }}
            onChange={(value, option) =>
              handleChangeTaskField(JSON.parse(option.key))
            }
          >
            {typeTasks?.map((type, idx) => (
              <Option
                key={JSON.stringify({
                  name: "typeId",
                  value: type.id,
                })}
                value={type.id}
              >
                <Space>
                  <b style={{ fontSize: 12 }}>{type.taskType.toUpperCase()}</b>
                  {taskTypeDetailIcon(type.id)}
                </Space>
              </Option>
            ))}
          </Select>
          <b className="text-primary">ID_{taskId}</b>
        </div>
        <div style={{ display: "flex" }} className="task-click">
          <Space>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => dispatch(deleteIssueDetail(taskId, projectId))}
            >
              <i
                className="fa fa-trash-alt"
                style={{ cursor: "pointer", fontSize: 18 }}
              />
            </button>

            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <i className="fa fa-times"></i>
            </button>
          </Space>
        </div>
      </div>
      <div className="modal-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-8">
              <p className="issue">{taskName}</p>
              <div className="description">
                <h6 onClick={() => setVisibleEditDesc(true)}>Description</h6>
                {renderDescription()}
              </div>
              <div className="comment">
                <h6>Comment</h6>
                <div className="block-comment" style={{ display: "flex" }}>
                  {renderInputComment()}
                </div>
                <div className="lastest-comment">{renderComment()}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group status">
                <label htmlFor="statusId">
                  <h6>STATUS</h6>
                </label>
                <Select
                  id="statusId"
                  className="w-100"
                  placeholder="Select..."
                  name="statusId"
                  value={statusId}
                  onChange={(value, option) =>
                    handleChangeTaskField(JSON.parse(option.key))
                  }
                >
                  {projectDetail.lstTask?.map((task, idx) => (
                    <Option
                      key={JSON.stringify({
                        name: "statusId",
                        value: task.statusId,
                      })}
                      value={task.statusId}
                    >
                      {task.statusName}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="form-group assignees">
                <label htmlFor="listUserAsign">
                  <h6>ASSIGNEES</h6>
                </label>
                <Select
                  name="listUserAsign"
                  id="listUserAsign"
                  mode="multiple"
                  placeholder="+ Add more"
                  options={memberOptions}
                  value={listUserAsign}
                  onChange={(values) =>
                    handleChangeTaskField({
                      name: "listUserAsign",
                      value: values,
                    })
                  }
                  style={{
                    width: "100%",
                  }}
                />
              </div>
              <div className="priority" style={{ marginBottom: 20 }}>
                <label htmlFor="priorityId">
                  <h6>PRIORITY</h6>
                </label>
                <Select
                  showArrow
                  value={priorityId}
                  name="priorityId"
                  id="priorityId"
                  placeholder="Select..."
                  className="w-100"
                  onChange={(value, option) =>
                    handleChangeTaskField(JSON.parse(option.key))
                  }
                >
                  {priorities?.map((priority, idx) => (
                    <Option
                      key={JSON.stringify({
                        name: "priorityId",
                        value: priority.priorityId,
                      })}
                      value={priority.priorityId}
                    >
                      <Space>
                        {priorityIcon(priority.priorityId)}
                        <span>{priority.priority}</span>
                      </Space>
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="estimate">
                <label htmlFor="originalEstimate">
                  <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                </label>
                <input
                  className="form-control"
                  name="originalEstimate"
                  min={0}
                  defaultValue={0}
                  type="number"
                  value={originalEstimate}
                  onChange={(e) =>
                    handleChangeTaskField({
                      name: e.target.name,
                      value: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="mt-3 time-tracking">
                <label htmlFor="timeTracking">
                  <h6>TIME TRACKING</h6>
                </label>
                <Slider
                  defaultValue={30}
                  value={Number(timeTrackingSpent)}
                  name="timeTracking"
                  className="mt-0"
                  max={
                    Number(timeTrackingRemaining) + Number(timeTrackingSpent)
                  }
                />
                <div>
                  <span
                    className="font-weight-bold float-left"
                    style={{ fontSize: 10 }}
                  >{`${timeTrackingSpent}h logged`}</span>
                  <span
                    className="font-weight-bold float-right"
                    style={{ fontSize: 10 }}
                  >{`${timeTrackingRemaining}h remaining`}</span>
                </div>
                <div className="pt-4">
                  <div className="w-50 float-left pr-1">
                    <div className="form-group">
                      <label htmlFor="timeTrackingSpent">
                        <h6>TIME SPEND</h6>
                      </label>
                      <input
                        className="form-control"
                        name="timeTrackingSpent"
                        min={0}
                        type="number"
                        value={timeTrackingSpent}
                        onChange={(e) => handleChangeTaskField(e.target)}
                      ></input>
                    </div>
                  </div>
                  <div className="w-50 float-right pl-1">
                    <div className="form-group">
                      <label htmlFor="timeTrackingRemaining">
                        <h6>TIME REMAINING</h6>
                      </label>
                      <input
                        className="form-control"
                        name="timeTrackingRemaining"
                        value={timeTrackingRemaining}
                        min={0}
                        type="number"
                        onChange={(e) => handleChangeTaskField(e.target)}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
