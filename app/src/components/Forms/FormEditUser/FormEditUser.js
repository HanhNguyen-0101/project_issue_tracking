import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Input } from "antd";
import { setSubmitDrawer } from "../../../redux/actions/DrawerAction";
import { updateUser } from "../../../redux/actions/UserAction";

function FormEditUser(props) {
  const {
    dispatch,
    errors,
    values,
    handleChange,
    handleSubmit,
  } = props;

  useEffect(() => {
    dispatch(setSubmitDrawer(handleSubmit));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <Input
                className="form-control"
                id="id"
                name="id"
                value={values.id}
                disabled
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="name">
                Name <span style={{ color: "red" }}>*</span>
              </label>
              <Input
                className="form-control"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="email">
                Email <span style={{ color: "red" }}>*</span>
              </label>
              <Input
                className="form-control"
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <Input
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                type="phone"
                value={values.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
const FormEditUserWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ userSearch }) => ({
    id: userSearch[0]?.userId,
    name: userSearch[0]?.name,
    email: userSearch[0]?.email,
    phoneNumber: userSearch[0]?.phoneNumber,
  }),
  validationSchema: Yup.object({
    name: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Username is required"),
    phoneNumber: Yup.string().matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(updateUser(values));
  },

  displayName: "EditUserForm",
})(FormEditUser);

const mapStateToProps = (state) => ({
  userSearch: state.UserReducer.userSearch,
});

export default connect(mapStateToProps)(FormEditUserWithFormik);
