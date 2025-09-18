import React, { Children, use, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined,LoginOutlined,QuestionCircleOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme,Avatar,Typography,Dropdown,Modal, ConfigProvider } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const {Text} = Typography;
const { Header, Content, Sider } = Layout;







const DashBoard: React.FC = () => {
 
  const selector=useSelector((state:any)=>state.user.username)
  const navigate=useNavigate()
  const [isModalOpen,setIsModalOpen]=useState(false)
  const items2: MenuProps['items'] = [UserOutlined].map(
  ( index) => {

    return {
      key: 'UserCenter',
      icon: React.createElement(UserOutlined),
      label: 'User Center',
      children: [
        {
          key:'1',
          label:'Student List',
          onClick:()=>navigate('students')
        },
        {
          key:'2',
          label:'Chat With Ai',
          onClick:()=>navigate('aichat')
        }
      ]
    };
  },
);
  const logout=()=>{
  Cookies.remove('token');
  navigate('/login');
  }
   const handleOk = () => {
    setIsModalOpen(false);
    logout()
  };
const handleLogout = () => {
    setIsModalOpen(true);
  };

  console.log("this is selector",selector)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const avatarMenu:MenuProps["items"]=[
  {
    key:"1",
    label:'Profile',
    onClick:()=>navigate('/profile')
  },
  {
    key:"2",
    label:'Logout',
    onClick:handleLogout,
    icon:<LoginOutlined />
  }
  
]
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
      <ConfigProvider
    theme={{
      components: {
        Layout: {
          headerBg: 'rgb(255,255,255)',
          siderBg:'#f0f2f5',
          colorBgContainer: '#ffffff',
        },
        Menu:{
          colorBgContainer: '#f0f2f5',
        darkItemBg: '#f0f2f5',
        darkItemSelectedBg: '#e6f7ff',
        }
      },
      token: {
      colorPrimary: '#1890ff',
    }
    }}
  >
    <Layout>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
       <Text style={{
        fontWeight:'bold',
        fontSize:'20px'
       }}>UnderGraduation</Text>
        <div>

        </div>
        
        <span style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          padding: '0 16px' 
        }}>
          <Text style={{ 
            color: 'rgba(0, 0, 0, 0.85)', 
            fontSize: '16px', 
            fontWeight: 500 
          }}>
            {selector}
          </Text>
          <Dropdown 
            menu={{
              items: avatarMenu,
              style: { textAlign: 'center' }
            }} 
            placement="bottom"
            overlayStyle={{ width: 100, minWidth: 50 }}
          >
            <Avatar size={40} icon={<UserOutlined />} /> 
          </Dropdown>
          
          <Modal
            title="Logout"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={400}
            centered
          >
            <p>Are you sure to logout?</p>
          </Modal>
        </span>
      </Header>
      
      <Layout>
        <Sider width={200} >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: '16px',
              minHeight: '100vh',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </ConfigProvider>
  );
};

export default DashBoard;