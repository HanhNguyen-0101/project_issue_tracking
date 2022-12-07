/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Form, Input } from "antd";
import {
  LockOutlined,
  UserOutlined,
  TwitterCircleFilled,
} from "@ant-design/icons";
import * as Yup from "yup";
import React from "react";
import { connect } from "react-redux";
import { withFormik } from "formik";
import { userLogin } from "../../redux/actions/UserAction";
import { NavLink } from "react-router-dom";
import { history } from "../../utils/history/history";
import { USER_LOGIN_STORE } from "../../utils/constants/settingSystem";

const LoginPage = (props) => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  if (!localStorage.getItem(USER_LOGIN_STORE)) {
    return (
      <>
        <h3 className="text-center text-3xl primary">Login</h3>
        <form
          onSubmit={handleSubmit}
          className="login-form mt-10"
          id="components-form-demo-normal-login"
        >
          <Form.Item>
            <Input
              prefix={<UserOutlined className="site-form-item-icon py-2" />}
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              name="email"
            />
            {touched.email && errors.email ? (
              <div className="text-danger">{errors.email}</div>
            ) : null}
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<LockOutlined className="site-form-item-icon py-2" />}
              type="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.passWord}
              name="passWord"
            />
            {touched.passWord && errors.passWord ? (
              <div className="text-danger">{errors.passWord}</div>
            ) : null}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button py-2 h-auto"
            >
              Log in
            </Button>
            <div className="mt-2 float-right">
              <NavLink to="/register">Register Now</NavLink>
            </div>
          </Form.Item>
        </form>
        <div className="d-flex justify-content-center">
          <a href="#Facebook" title="Facebook" className="p-1">
            <i className="fa-brands fa-facebook" style={{ fontSize: 30 }}></i>
          </a>
          <a href="#Twitter" title="Twitter" className="p-1">
            <TwitterCircleFilled style={{ fontSize: 30 }} />
          </a>
        </div>
      </>
    );
  } else {
    history.push("/management-project");
    window.location.reload();
    return;
  }
};
const LoginForm = withFormik({
  mapPropsToValues: () => ({
    email: "",
    passWord: "",
  }),

  validationSchema: Yup.object({
    passWord: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(userLogin(values));
  },

  displayName: "LoginForm",
})(LoginPage);
export default connect()(LoginForm);
