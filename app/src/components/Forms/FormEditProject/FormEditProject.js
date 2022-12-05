import { Editor } from "@tinymce/tinymce-react";
import { Input } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import { getAllCategory } from "../../../redux/actions/ProjectAction";
import { setSubmitDrawer } from "../../../redux/actions/DrawerAction";
import { editProjectDetail } from "../../../redux/actions/ProjectAction";

function FormEditProject(props) {
  const {
    categories,
    dispatch,
    errors,
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = props;

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(setSubmitDrawer(handleSubmit));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <Input
                className="form-control"
                id="id"
                name="id"
                value={values.id}
                onChange={handleChange}
                disabled
              />
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="projectName">
                Name <span style={{ color: "red" }}>*</span>
              </label>
              <Input
                className="form-control"
                id="projectName"
                name="projectName"
                value={values.projectName}
                onChange={handleChange}
              />
              {errors.projectName && (
                <p style={{ color: "red" }}>{errors.projectName}</p>
              )}
            </div>
          </div>
          <div className="col-4">
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
                value={values.categoryId.toString()}
              >
                {categories?.map((category, idx) => (
                  <option value={category.id.toString()} key={idx}>
                    {category.projectCategoryName}
                  </option>
                ))}
              </select>
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
          </div>
        </div>
      </form>
    </div>
  );
}

const FormEditProjectWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ editProject }) => ({
    projectName: editProject.projectName,
    description: editProject.description,
    categoryId: editProject.categoryId,
    id: editProject.id,
  }),
  validationSchema: Yup.object({
    projectName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(editProjectDetail({...values, categoryId: values.categoryId.toString()}));
  },

  displayName: "EditProjectForm",
})(FormEditProject);

const mapStateToProps = (state) => ({
  categories: state.ProjectReducer.categories,
  editProject: state.ProjectReducer.editProject,
});

export default connect(mapStateToProps)(FormEditProjectWithFormik);
