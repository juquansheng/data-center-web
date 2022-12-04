import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Form, Input, Button, message, Spin } from "antd";
import DocumentTitle from "react-document-title";
import { login } from "@/store/action/auth.js";
import { useDispatch, useSelector } from 'react-redux';

export default function Login()  {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const token = useSelector((state)=>state.auth.token);
  

  const handleLogin = (data) => {
    setLoading(true);
    login(data)(dispatch)
      .then((data) => {
        message.success("Login successfully");
      })
      .catch((error) => {
        console.log("Login failed");
        setLoading(false);
        message.error(error);
      });
  };


  if (token) {
    return <Navigate to="/index"/>;
  };

  return (
    <DocumentTitle title={"User Login"}>
      <div className="login-container">
        <Form onFinish={handleLogin} className="content" 
        initialValues={{
        remember: true,
        }}
      >
          <div className="title">
            <h2>User Login</h2>
          </div>
          <Spin spinning={loading} tip="Logging in...">
            <Form.Item name="username" rules = {[
                  {
                    required: true,
                    whitespace: true,
                    message: "please input user name",
                  },
                ]}>
              <Input
                  placeholder="user name"
                />
            </Form.Item>
            <Form.Item name="password" rules ={[
                  {
                    required: true,
                    whitespace: true,
                    message: "please input password",
                  },
                ]}>
              <Input
                  type="password"
                  placeholder="password"
                />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
            <Form.Item>
              <span>username : admin password : </span>
            </Form.Item>
          </Spin>
        </Form>
      </div>
    </DocumentTitle>
  );
};

