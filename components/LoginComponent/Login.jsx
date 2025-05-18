import React, { useState } from 'react';
import './Login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('邮箱和密码不能为空！');
    } else {
      setError('');
      alert(`登录成功！\n邮箱: ${email}`);
    }
  };

  return (
    <div className="login-container">
      {/* 新增动画背景元素 */}
      <div className="clouds"></div>
      <div className="clouds cloud2"></div>
      <div className="clouds cloud3"></div>

      <div className="login-box">
        <h2>用户登录</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱"
            />
          </div>
          <div className="input-group">
            <label>密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
            />
          </div>
          <button type="submit" className="login-button">
            登录
          </button>
        </form>
        <div className="footer-links">
          <a href="#">忘记密码？</a>
          <a href="#">注册账号</a>
        </div>
      </div>
    </div>
  );
};

export default Login;