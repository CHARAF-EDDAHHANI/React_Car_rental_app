import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);

  const onFinish = (values) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log('Stored user:', storedUser);
    console.log('Login values:', values);

    if (
      storedUser &&
      storedUser.email === values.email &&
      storedUser.password === values.password
    ) {
      console.log('User authorized successfully:', values);
      alert('User authorized successfully');
      setError(null);
      navigate(`/Profile`);
    } else {
      setError('Invalid email or password');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Login failed:', errorInfo);
  };

  return (
    <div style={{ padding:'2em', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f0f2f5' }}>
      <Form 
        form={form}
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: '80%', padding: '2em', border: '1px solid #ccc', borderRadius: '5px',  backgroundColor: '#f9f9f9' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        {error && (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <span style={{ color: 'red' }}>{error}</span>
          </Form.Item>
        )}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <p>Don’t have an account?</p>
      <Button 
      type='link'
      onClick={() => navigate('/signup')}>Sign Up</Button>
    </div>
  );
};

export default Login;
