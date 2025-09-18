import React, { useState, useRef, useEffect } from 'react';
import { 
  Layout, 
  Input, 
  Button, 
  List, 
  Avatar, 
  Card, 
  Typography,
  Divider,
  Space,
  Alert
} from 'antd';
import { 
  SendOutlined, 
  UserOutlined, 
  RobotOutlined,
  SmileOutlined,
  PaperClipOutlined
} from '@ant-design/icons';
import './AiChatWindow.css';
import request from '@/utils/request';

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const { Title, Text } = Typography;

interface User {
  id: number;
  name: string;
  avatar: React.ReactNode | null;
  isAI?: boolean;
}

interface Message {
  id: number;
  content: string;
  sender: User;
  timestamp: Date;
  isStreaming?: boolean;
}

const currentUser: User = {
  id: 1,
  name: 'You',
  avatar: <UserOutlined />,
};

const aiUser: User = {
  id: 2,
  name: 'AI Assistant',
  avatar: <RobotOutlined />,
  isAI: true
};

const initialMessages: Message[] = [
  {
    id: 1,
    content: 'Hello! I\'m your academic advisor assistant. How can I help you with your studies or major selection today?',
    sender: aiUser,
    timestamp: new Date()
  }
];

interface AiChatWindowProps {
  className?: string;
  style?: React.CSSProperties;
  height?: number | string;
}

const AiChatWindow: React.FC<AiChatWindowProps> = ({ 
  className = '', 
  style = {},
  height = 1200 
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 const handleSendMessage = async () => {
  if (newMessage.trim() === '') return;

  const userMessage: Message = {
    id: Date.now(),
    content: newMessage.trim(),
    sender: currentUser,
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setNewMessage('');
  setIsLoading(true);
  setError(null);

  const aiMessageId = Date.now() + 1;
  const aiMessage: Message = {
    id: aiMessageId,
    content: '',
    sender: aiUser,
    timestamp: new Date(),
    isStreaming: true
  };

  setMessages(prev => [...prev, aiMessage]);

  try {
    const response = await request.post('/api/chatStream', {
      message: userMessage.content,
      conversationHistory: messages.map(m => ({
        content: m.content,
        sender: m.sender.name
      }))
    });

    if (response.data) {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === aiMessageId
            ? { ...msg, content: response.data, isStreaming: false }
            : msg
        )
      );
    }
  } catch (error: any) {
    console.error('Request error:', error);
    setError(error.message || 'Failed to get response from server');

    setMessages(prev => prev.filter(msg => msg.id !== aiMessageId));

    const errorMessage: Message = {
      id: Date.now(),
      content: 'Sorry, I encountered an error. Please try again.',
      sender: aiUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsLoading(false);
  }
};


  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Layout 
      className={`ai-chat-layout ${className}`}
      style={{ height, ...style }}
    >
      <Header className="ai-chat-header">
        <Space>
          <RobotOutlined className="ai-chat-header-icon" />
          <Title level={4} className="ai-chat-title">
            Academic Advisor AI
          </Title>
        </Space>
        <Text className="ai-chat-status">
          <span className="online-indicator">●</span> Online
        </Text>
      </Header>

      <Content className="ai-chat-content">
        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            closable
            onClose={() => setError(null)}
            style={{ marginBottom: 16 }}
          />
        )}
        <Card className="messages-card">
          <List
            dataSource={messages}
            renderItem={(message) => (
              <List.Item 
                className={`message-item ${message.sender.id === currentUser.id ? 'own-message' : ''}`}
              >
                <div className="message-container">
                  <Avatar 
                    size="small"
                    icon={message.sender.avatar} 
                    className={`message-avatar ${message.sender.isAI ? 'ai-avatar' : 'user-avatar'}`}
                  />
                  <div className="message-content-wrapper">
                    <div className="message-header">
                      <Text strong className="message-sender">
                        {message.sender.name}
                      </Text>
                      <Text type="secondary" className="message-time">
                        {formatTime(message.timestamp)}
                      </Text>
                    </div>
                    <div className={`message-bubble ${message.isStreaming ? 'streaming-message' : ''}`}>
                      {message.content}
                      {message.isStreaming && (
                        <span className="streaming-cursor">|</span>
                      )}
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          />
          <div ref={messagesEndRef} />
        </Card>
      </Content>

      <Divider className="chat-divider" />

      <Footer className="ai-chat-footer">
        <div className="message-input-container">
          <div className="input-toolbar">
            <Button 
              type="text" 
              size="small" 
              icon={<SmileOutlined />} 
              className="toolbar-button" 
            />
            <Button 
              type="text" 
              size="small" 
              icon={<PaperClipOutlined />} 
              className="toolbar-button" 
            />
          </div>
          <TextArea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your major, courses, or academic planning..."
            autoSize={{ minRows: 1, maxRows: 3 }}
            className="message-input"
            disabled={isLoading}
          />
          <div className="send-button-container">
            <Button
              type="primary"
              size="small"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              disabled={newMessage.trim() === '' || isLoading}
              loading={isLoading}
              className="send-button"
            >
              Send
            </Button>
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default AiChatWindow;
