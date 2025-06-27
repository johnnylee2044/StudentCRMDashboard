import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, ConfigProvider, message,Alert } from 'antd';
import React from 'react';
import axios from 'axios';
import BASEURL from '@/constants/index'
import styles from './styles.module.css';

const LoginCard: React.FC = () => {


  const [form] = Form.useForm();

  const LoginError=(message:string)=>{
    return(
       <Alert
      message="Error"
      description={message}
      type="error"
      showIcon
    />
    )
  }
  const onFinish = async (values: { username: string; password: string }) => {

    try {
       const res = await axios.post(
      BASEURL+'/login',
      {
        username: values.username,
        password: values.password,
      }
    );
      console.log("response in the data",res.data);
      if (res.data.code === '200') {
      message.success('Login success!');
      window.location.href = '/dashboard';
    } else {
      return LoginError(res.data.message)
    }

 
    } catch (error) {
      return LoginError("Something went wrong! Please try again later.")
    }
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1890ff' } }}>
      <div className={styles.animatedBackground}>
        <div className={styles.loginContainer}>
          <Card className={styles.loginCard} title="POS System Login">
            <Form
              form={form}
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              className={styles.loginForm}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please enter your Username!' },
                  { min: 4, message: 'Username at least 4 characters' }
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Please enter your Username"
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