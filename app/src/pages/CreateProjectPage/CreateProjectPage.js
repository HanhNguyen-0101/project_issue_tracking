import React, { useEffect, useRef } from "react";
import { Button, Input } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import {
  createProject,
  getAllCategory,
} from "../../redux/actions/ProjectAction";

function CreateProjectPage(props) {
  const { categories, errors, handleChange, handleSubmit, setFieldValue } =
    props;
  const editorRef = useRef(null);
  const handleEditorChange = () => {
    if (editorRef.current) {
      setFieldValue("description", editorRef.current.getContent());
    }
  };
  useEffect(() => {
    props.dispatch(getAllCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="main w-100" style={{ padding: 50 }}>
      <h3 className="text-3xl">Create Project</h3>
      <div className="content">
        <form style={{ maxWidth: 800 }} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="projectName">
              Name <span style={{ color: "red" }}>*</span>
            </label>
            <Input
              className="form-control"
              id="projectName"
              name="projectName"
              onChange={handleChange}
            />
            {errors.projectName && (
              <p style={{ color: "red" }}>{errors.projectName}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <Editor
              className="form-control"
              id="description"
              name="description"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue=""
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
              onEditorChange={handleEditorChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryId">
              Type <span style={{ color: "red" }}>*</span>
            </label>
            <select
              id="categoryId"
              className="w-100 form-control"
              placeholder="Select..."
              name="categoryId"
              onChange={handleChange}
            >
              {(categories || []).map((category, index) => {
                return (
                  <option key={index} value={category.id}>
                    {category.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group mt-8 float-right">
            <Button
              className="text-white"
              style={{ backgroundColor: "#065fd4" }}
              ghost
              htmlType="submit"
            >
              Create Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const CreateProjectPageFormik = withFormik({
  mapPropsToValues: (props) => ({
    projectName: "",
    description: "",
    categoryId: props.categories[0]?.id,
  }),

  validationSchema: Yup.object({
    projectName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(
      createProject({ ...values, categoryId: Number(values.categoryId) })
    );
  },

  displayName: "CreateProjectForm",
})(CreateProjectPage);

const mapStateToProps = (state) => ({
  categories: state.ProjectReducer.categories,
});

export default connect(mapStateToProps)(CreateProjectPageFormik);
