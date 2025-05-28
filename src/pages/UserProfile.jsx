import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoneyCollectTwoTone,
  UserOutlined,
  HeartFilled,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';


const { Header, Sider, Content } = Layout;


const UserProfile = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const userSession = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  }
useEffect(() => {
  const handleResize = () => {
    if(window.innerWidth <700) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };
  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <Layout style={{ marginTop: '0px' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Logout',
              onClick: handleLogout,
            },
            {
              key: '2',
              icon: <HeartFilled />,
              label: 'Favorites',
            },
            {
              key: '3',
              icon: <MoneyCollectTwoTone />,
              label: 'payements',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
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
          Your Information : 
          <div style ={{ 
            marginTop: '20px', 
            fontFamily: 'sans-serif', 
            fontSize: '20px',
            color: '#333',
            display: 'grid',
            gap: '2em',}}
            >
            <p>Firstname: {userSession?.firstname}</p>
            <p>Lastname: {userSession?.lastname}</p>
            <p>Email: {userSession?.email}</p>
            <p>Phone: {userSession?.phone}</p>
            </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default UserProfile;