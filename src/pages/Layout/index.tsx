import React, { Children, use, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined,LoginOutlined,QuestionCircleOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme,Avatar,Typography,Dropdown,Modal } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
const {Text} = Typography;
const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
//header bar



const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: Array.from({ length: 4 }).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
          
        };
      }),
    };
  },
);



const DashBoard: React.FC = () => {
  const selector=useSelector((state:any)=>state.user.username)
  const navigate=useNavigate()
  const [isModalOpen,setIsModalOpen]=useState(false)

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
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
       <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 16px' }}>
    <Text style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '16px', fontWeight: 500 }}>
      {selector}
    </Text>
    <Dropdown menu={{items:avatarMenu,style:{textAlign:'center'}}} placement='bottom'
    overlayStyle={{width:100, minWidth:50}}
    
    >
    <Avatar size={64} icon={<UserOutlined />} />
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
  </div>
        
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
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
  );
};

export default DashBoard;