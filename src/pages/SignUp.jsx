import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    localStorage.setItem('user', JSON.stringify(values));
    console.log('User registered successfully:', values);
    alert('User registered successfully in the local storage');
    navigate(`/Profile`);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ padding:'2em', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f0f2f5' }}>
      <Form
        form={form}
        name="signup"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: '80%', padding: '2em', border: '1px solid #ccc', borderRadius: '5px',  backgroundColor: '#f9f9f9' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="firstname"
          name="firstname"
          rules={[{ required: true, message: 'Please input your firstname!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="lastname"
          name="lastname"
          rules={[{ required: true, message: 'Please input your Lastname!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="phone"
          name="phone"
          rules={[{ required: true, message: 'Please input your Phone!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <p>Already have an account?</p>
      <Button
      type='link'
      onClick={() => {
        navigate('/Login');
      }}
      >Login</Button>
    </div>
  );
};

export default SignUp;
