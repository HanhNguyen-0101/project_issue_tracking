import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import { setSubmitDrawer } from "../../../redux/actions/DrawerAction";
import { Input, Select, Slider, AutoComplete, Space } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { getAllProject } from "../../../redux/actions/ProjectAction";
import {
  createIssueDetail,
  getAllPriority,
  getAllTypeTask,
} from "../../../redux/actions/IssueAction";
import { priorityIcon, taskTypeDetailIcon } from "../../../utils/render/taskUtil";
const { Option } = AutoComplete;

function FormCreateIssue(props) {
  const [timeTrackingState, setTimeTrackingState] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  const {
    dispatch,
    errors,
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    projects,
    priorities,
    typeTasks,
    projectDetail,
  } = props;

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };
  const handleTimeTrackingChange = (e) => {
    const { value, name } = e.target;
    setTimeTrackingState({
      ...timeTrackingState,
      [name]: value,
    });
    setFieldValue(name, value);
  };

  const options = projectDetail.members?.map((i) => {
    return { label: i.name, value: i.userId };
  });
  const children = [];
  useEffect(() => {
    dispatch(getAllProject());
    dispatch(getAllPriority());
    dispatch(getAllTypeTask());
    dispatch(setSubmitDrawer(handleSubmit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="projectId">
                Project <span style={{ color: "red" }}>*</span>
              </label>
              <Select
                id="projectId"
                className="w-100"
                placeholder="Select..."
                name="projectId"
                onChange={(value) => {
                  setFieldValue('projectId', value);
                }}
                value={values.projectId}
              >
                {projects?.map((project, idx) => (
                  <Option key={idx} value={project.id}>
                    {project.projectName}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="taskName">
                Task Name <span style={{ color: "red" }}>*</span>
              </label>
              <Input
                className="form-control"
                id="taskName"
                name="taskName"
                value={values.taskName}
                onChange={handleChange}
              />
              {errors.taskName && (
                <p style={{ color: "red" }}>{errors.taskName}</p>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="priorityId">
                Priority <span style={{ color: "red" }}>*</span>
              </label>
              <Select
                  showArrow
                  value={values.priorityId}
                  name="priorityId"
                  onChange={(value) => {
                    setFieldValue('priorityId', value);
                  }}
                  id="priorityId"
                  placeholder="Select..."
                  className="w-100"
                >
                  {priorities?.map((priority, idx) => (
                    <Option key={idx} value={priority.priorityId}>
                      <Space>
                        {priorityIcon(priority.priorityId)}
                        <span>{priority.priority}</span>
                      </Space>
                    </Option>
                  ))}
                </Select>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="typeId">
                Task Type <span style={{ color: "red" }}>*</span>
              </label>
              <Select
                  showArrow
                  value={values.typeId}
                  name="typeId"
                  onChange={(value) => {
                    setFieldValue('typeId', value);
                  }}
                  id="typeId"
                  placeholder="Select..."
                  className="w-100"
                >
                  {typeTasks?.map((type, idx) => (
                    <Option key={idx} value={type.id}>
                      <Space>
                        {taskTypeDetailIcon(type.id)}
                        <span>{type.taskType.charAt(0).toUpperCase() + type.taskType.slice(1)}</span>
                      </Space>
                    </Option>
                  ))}
                </Select>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="statusId">
                Status <span style={{ color: "red" }}>*</span>
              </label>
              <Select
                id="statusId"
                className="w-100"
                placeholder="Select..."
                name="statusId"
                onChange={(value) => {
                  setFieldValue('statusId', value);
                }}
                value={values.statusId}
              >
                {projectDetail.lstTask?.map((task, idx) => (
                  <Option key={idx} value={task.statusId}>
                    {task.statusName}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="listUserAsign">Assignees</label>
              <Select
                mode="multiple"
                options={options}
                placeholder="Please select"
                optionFilterProp="label"
                onChange={(values) => {
                  setFieldValue("listUserAsign", values);
                }}
                style={{ width: "100%" }}
              >
                {children}
              </Select>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="timeTracking">Time Tracking</label>
              <Slider
                defaultValue={30}
                value={Number(timeTrackingState.timeTrackingSpent)}
                name="timeTracking"
                className="mt-0"
                max={
                  Number(timeTrackingState.timeTrackingRemaining) +
                  Number(timeTrackingState.timeTrackingSpent)
                }
              />
              <div>
                <span
                  className="font-weight-bold float-left"
                  style={{ fontSize: 10 }}
                >{`${timeTrackingState.timeTrackingSpent}h logged`}</span>
                <span
                  className="font-weight-bold float-right"
                  style={{ fontSize: 10 }}
                >{`${timeTrackingState.timeTrackingRemaining}h remaining`}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <label htmlFor="originalEstimate">Original Estimate</label>
            <input
              className="form-control"
              name="originalEstimate"
              min={0}
              defaultValue={0}
              type="number"
              onChange={handleChange}
            ></input>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="timeTrackingSpent">Time Spend</label>
              <input
                className="form-control"
                name="timeTrackingSpent"
                min={0}
                type="number"
                value={timeTrackingState.timeTrackingSpent}
                onChange={(e) => handleTimeTrackingChange(e)}
              ></input>
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="timeTrackingRemaining">Time Remaining</label>
              <input
                className="form-control"
                name="timeTrackingRemaining"
                value={timeTrackingState.timeTrackingRemaining}
                min={0}
                type="number"
                onChange={(e) => handleTimeTrackingChange(e)}
              ></input>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Editor
                className="form-control"
                id="description"
                name="description"
                initialValue={values.description}
                init={{
                  height: 200,
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
                onEditorChange={handleEditorChange}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
const FormCreateIssueWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ projects, priorities, typeTasks, projectDetail }) => ({
    listUserAsign: [],
    taskName: "",
    description: "",
    statusId: projectDetail.lstTask[0]?.statusId,
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
    projectId: projects[0]?.id,
    typeId: typeTasks[0]?.id,
    priorityId: priorities[0]?.priorityId,
  }),
  validationSchema: Yup.object({
    taskName: Yup.string()
      .max(100, "Must be 100 characters or less")
      .required("Required"),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    const issue = {
      ...values,
      priorityId: Number(values.priorityId),
      projectId: Number(values.projectId),
      timeTrackingRemaining: Number(values.timeTrackingRemaining),
      timeTrackingSpent: Number(values.timeTrackingSpent),
      typeId: Number(values.typeId)
    }
    props.dispatch(createIssueDetail(issue));
  },

  displayName: "CreateIssueForm",
})(FormCreateIssue);

const mapStateToProps = (state) => ({
  projects: state.ProjectReducer.projects,
  priorities: state.IssueReducer.priorities,
  typeTasks: state.IssueReducer.typeTasks,
  projectDetail: state.ProjectReducer.projectDetail,
});

export default connect(mapStateToProps)(FormCreateIssueWithFormik);
