import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, ConfigProvider, message } from 'antd';
import React, { use, useEffect } from 'react';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, setAccount } from '@/store/modules/user';
import { AppDispatch } from '@/store';
import { useNavigate } from 'react-router-dom';
import store from '@/store';
import Cookies from 'js-cookie';
const LoginCard: React.FC = () => {

  const [messageApi, contextHolder]=message.useMessage();
  const dispatch=useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const selector = useSelector((state:any) => state.user.token);
  const navigate=useNavigate();
  const onFinish = async (values:any) => {
    
    
    
    try {
        console.log("this is login page",values)
      const data=await dispatch(fetchLogin(values)).unwrap();
     
      const message=data.message;
      const code=data.code;
      console.log("this is  message",message)  
      console.log("this is selector",selector)    
      if(code===200)
      {
         messageApi.open({
          type: 'success',
          content: message,
        });
         dispatch(setAccount(values.account))
        setTimeout(()=>{
          navigate('/dashboard')
        },3000)

       
      }
      else 
        {

        messageApi.open({
          type: 'error',
          content: message,
        });
        
        return
        
      }
     
      
    } catch (error) {
      return console.error("Something went wrong! Please try again later.",error)
    }
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1890ff' } }}>
      <div className={styles.animatedBackground}>
        <div className={styles.loginContainer}>
          <Card className={styles.loginCard} title="Admin Login">
            {contextHolder}
            <Form
              form={form}
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              className={styles.loginForm}
            >
              <Form.Item
                name="account"
                rules={[
                  { required: true, message: 'Please enter your Account!' },
                  { min: 4, message: 'Account at least 4 characters' }
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Please enter your Account"
                  size="large"
                  allowClear
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please enter your Password!' },
                  { min: 6, message: 'Password at least 6 characters' }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Please enter your Password"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className={styles.loginButton}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default LoginCard;