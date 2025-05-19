import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, ConfigProvider, message } from 'antd';
import React from 'react';
import styles from './styles.module.css';

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      console.log('Login value:', values);
      message.success('Login success!');

      // window.location.href = '/dashboard';
    } catch (error) {
      message.error('Login  failed!,Please check your username and password!');
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

export default LoginPage;