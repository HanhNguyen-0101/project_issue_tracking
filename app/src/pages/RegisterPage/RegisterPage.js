import { withFormik } from "formik";
import React from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Button, Form, Input } from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { registerUser } from "../../redux/actions/UserAction";

function RegisterPage(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  return (
    <>
      <h3 className="text-center text-3xl primary">Create Account</h3>
      <form
        onSubmit={handleSubmit}
        className="register-form mt-4"
        id="components-form-demo-normal-register"
      >
        <Form.Item>
          <Input
            prefix={<UserOutlined className="site-form-item-icon py-2" />}
            placeholder="Username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            name="name"
          />
          {touched.name && errors.name ? (
            <div className="text-danger">{errors.name}</div>
          ) : null}
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<MailOutlined className="site-form-item-icon py-2"/>}
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
            prefix={<PhoneOutlined className="site-form-item-icon py-2" />}
            placeholder="Phone Number"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phoneNumber}
            name="phoneNumber"
          />
          {touched.phoneNumber && errors.phoneNumber ? (
            <div className="text-danger">{errors.phoneNumber}</div>
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
            className="register-form-button w-100 py-2 h-auto"
          >
            Create Account
          </Button>
        </Form.Item>
      </form>
    </>
  );
}

const RegisterForm = withFormik({
  mapPropsToValues: () => ({
    email: "",
    passWord: "",
    name: '',
    phoneNumber: ''
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
    passWord: Yup.string().max(255).required('Password is required')
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(registerUser(values));    
  },

  displayName: "RegisterForm",
})(RegisterPage);
export default connect()(RegisterForm);
