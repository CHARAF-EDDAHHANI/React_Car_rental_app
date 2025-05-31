import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoneyCollectTwoTone,
  UserOutlined,
  HeartFilled,
  CarTwoTone,
  CloudUploadOutlined,
  CalendarTwoTone,
  WalletTwoTone,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  MessageFilled,
  CustomerServiceFilled,
  WarningTwoTone,
  CloseSquareTwoTone
} from '@ant-design/icons';

import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const UserProfile = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [profileType, setProfileType] = useState('');
  const [userSession, setUserSession] = useState(null);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem('user'));
      if (!session) throw new Error('No session');
      setUserSession(session);
      if (session.userType === 'seller') {
        setProfileType('seller');
      } else if (session.userType === 'buyer') {
        setProfileType('buyer');
      } else {
        throw new Error('Invalid userType');
      }
    } catch (error) {
      console.error('Session error:', error.message);
      localStorage.removeItem('user');
      navigate('/Login');
    }
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 700);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const menuItems = [
    { key: '1', icon: <UserOutlined />, label: 'Logout', onClick: handleLogout },
    { key: '2', icon: <MoneyCollectTwoTone twoToneColor="#13c2c2" />, label: 'Payments' },
    { key: '3', icon: <CalendarTwoTone twoToneColor="#fa541c" />, label: 'All Reservations' },
    { key: '4', icon: <MessageFilled style={{ color: '#fa8c16' }} />, label: 'Messages' },
    { key: '5', icon: <CustomerServiceFilled style={{ color: '#9254de' }} />, label: 'Support' },
    { key: '6', icon: <CheckCircleTwoTone twoToneColor="#73d13d" />, label: 'Validated Reservation' },
    { key: '7', icon: <CloseSquareTwoTone twoToneColor="#ff4d4f" />, label: 'Disvalidated Reservation' },
    { key: '8', icon: <WarningTwoTone twoToneColor="#faad14" />, label: 'Reclamation' },
    { key: '9', icon: <CarTwoTone twoToneColor="#1890ff" />, label: 'All Cars' },
    { key: '10', icon: <CloudUploadOutlined style={{ color: '#722ed1' }} />, label: 'Upload New Car' },
    { key: '11', icon: <CloseCircleTwoTone twoToneColor="#f5222d" />, label: 'Unavailable Cars' },
    { key: '12', icon: <CheckCircleTwoTone twoToneColor="#52c41a" />, label: 'Available Cars' },
  ];

  const getFilteredMenuItems = () => {
    if (profileType === 'buyer') {
      return menuItems.slice(0, 8); // Items 1 to 8
    }
    return menuItems;
  };

  const renderUserDetails = () => {
    if (!userSession) return null;

    const commonFields = (
      <>
        <p>Firstname: {userSession.firstname}</p>
        <p>Lastname: {userSession.lastname}</p>
        <p>Email: {userSession.email}</p>
        <p>Phone: {userSession.phone}</p>
      </>
    );

    if (profileType === 'buyer') {
      return commonFields;
    }

    if (profileType === 'seller') {
      return (
        <>
          {commonFields}
          <p>Address: {userSession.address}</p>
          <p>Plan: {userSession.plan}</p>
          <p>Company Name: {userSession.companyName}</p>
          <p>Company Address: {userSession.companyAddress}</p>
          <p>Company Phone: {userSession.companyPhone}</p>
          <p>Company Email: {userSession.companyEmail}</p>
        </>
      );
    }

    return null;
  };

  const renderLayout = () => (
    <Layout style={{ marginTop: '0px' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={getFilteredMenuItems()}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 29,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            fontFamily: 'sans-serif',
            fontSize: '20px',
            color: '#333',
          }}
        >
          <div>
            <strong>Your Information:</strong>{' '}
            {profileType === 'seller' && `You are subscribed as a ${userSession?.userType}`}
          </div>
          <div
            style={{
              marginTop: '20px',
              display: 'grid',
              gap: '2em',
              fontFamily: 'sans-serif',
              fontSize: '20px',
              color: '#333',
            }}
          >
            {renderUserDetails()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );

  return <div>{profileType ? renderLayout() : null}</div>;
};

export default UserProfile;
