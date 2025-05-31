import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [userType, setUserType] = useState(null); 
  const [plan, setPlan] = useState('basic');
  const [sellerForm] = Form.useForm();
  const [buyerForm] = Form.useForm();
  const navigate = useNavigate();

  // func return user information with state and plan  
  const onFinish = (values) => {
    const userData = {
      ...values,
      userType,
      plan: userType === 'seller' ? plan : null
    };
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('User registered successfully:', userData);
    alert('User registered successfully in the local storage');
    //redirect to Profile page depending on user type
    if (userType === 'seller' || userType === 'buyer') {
      navigate('/Profile');
    } else { 
      alert('Please select a user type (Seller or Buyer) and fill out the form, to profit from our services. or contact us for more information.');
      return;
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ padding: '2em', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '1em' }}>
        <Button
          onClick={() => setUserType('seller')}
          style={{
            marginRight: '1em',
            backgroundColor: userType === 'seller' ? '#1890ff' : '#f0f2f5',
            color: userType === 'seller' ? '#fff' : '#000'
          }}
        >
          Seller
        </Button>
        <Button
          onClick={() => setUserType('buyer')}
          style={{
            backgroundColor: userType === 'buyer' ? '#1890ff' : '#f0f2f5',
            color: userType === 'buyer' ? '#fff' : '#000'
          }}
        >
          Buyer
        </Button>
      </div>

      {/* Seller Form */}
      {userType === 'seller' && (
        <Form
          form={sellerForm}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '2em',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#fff'
          }}
        >
          <h2>Seller Registration</h2>

          <Form.Item label="Plan">
            <Radio.Group onChange={(e) => setPlan(e.target.value)} value={plan}>
              <Radio value="basic">Basic</Radio>
              <Radio value="premium">Premium</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="firstname" label="First Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="lastname" label="Last Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="adress" label="Address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="companyName" label="Company Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="companyAddress" label="Company Address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="companyPhone" label="Company Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="companyEmail" label="Company Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register as Seller
            </Button>
          </Form.Item>
        </Form>
      )}

      {/* Buyer Form */}
      {userType === 'buyer' && (
        <Form
          form={buyerForm}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '2em',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#fff'
          }}
        >
          <h2>Buyer Registration</h2>

          <Form.Item name="firstname" label="First Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="lastname" label="Last Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register as Buyer
            </Button>
          </Form.Item>
        </Form>
      )}

      <div style={{ textAlign: 'center', marginTop: '1em' }}>
        <p>Already have an account?</p>
        <Button type="link" onClick={() => navigate('/Login')}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
