import { Button, Modal, Tabs, Descriptions, Timeline, List, Input, Card, Progress, Select, DatePicker, Space, message } from 'antd';
import React, { useState } from 'react';
import { SendOutlined, FileTextOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

interface Note {
  id: number;
  author: string;
  text: string;
  createdAt: string;
}

interface Communication {
  id: number;
  type: 'Call' | 'Email' | 'Meeting' | 'Task';
  content: string;
  timestamp: string;
  dueDate?: string;
}

interface StudentProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  studentData?: {
    id: number;
    name: string;
    email: string;
    grade: string;
    country: string;
    applicationStatus: string;
    lastActive: string;
  };
  interactions?: Array<{ id: number; type: string; details: string; createdAt: string }>;
  communications?: Array<{ id: number; type: string; body: string; createdAt: string }>;
  notes?: Array<Note>;
}

const StudentDetail: React.FC<StudentProps> = ({
  isOpen,
  onClose,
  onConfirm,
  studentData,
  interactions = [],
  communications = [],
  notes = []
}) => {
  const [newNote, setNewNote] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [localNotes, setLocalNotes] = useState<Note[]>(notes || []);

  // Communication Tools State
  const [commType, setCommType] = useState<'Call' | 'Email' | 'Meeting' | 'Task'>('Call');
  const [commContent, setCommContent] = useState('');
  const [commDueDate, setCommDueDate] = useState<dayjs.Dayjs | null>(null);
  const [localCommunications, setLocalCommunications] = useState<Communication[]>(communications.map(c => ({
    id: c.id,
    type: c.type as Communication['type'],
    content: c.body,
    timestamp: c.createdAt
  })) || []);

  const stages = ["EXPLORING", "SHORTLISTING", "APPLYING", "SUBMITTED"];
  const getStageProgress = (status: string) => {
    const index = stages.indexOf(status);
    if (index === -1) return 0;
    return ((index + 1) / stages.length) * 100;
  };

  const handleOk = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  // Notes handlers
  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const note: Note = {
      id: Date.now(),
      author: "Current User",
      text: newNote,
      createdAt: new Date().toISOString(),
    };
    setLocalNotes([note, ...localNotes]);
    setNewNote("");
  };

  const handleEditNote = (id: number, newText: string) => {
    setLocalNotes(localNotes.map(n => n.id === id ? { ...n, text: newText } : n));
  };

  const handleDeleteNote = (id: number) => {
    setLocalNotes(localNotes.filter(n => n.id !== id));
  };

  // Communication Tools handlers
  const handleLogCommunication = () => {
    if (!commContent.trim()) {
      message.error('Please enter content');
      return;
    }
    const newComm: Communication = {
      id: Date.now(),
      type: commType,
      content: commContent,
      timestamp: dayjs().format('YYYY-MM-DD HH:mm'),
      dueDate: commType === 'Task' && commDueDate ? commDueDate.format('YYYY-MM-DD') : undefined
    };
    setLocalCommunications([newComm, ...localCommunications]);
    setCommContent('');
    setCommDueDate(null);
    message.success(`${commType} logged successfully`);
  };

  const handleSendMockEmail = () => {
    const emailComm: Communication = {
      id: Date.now(),
      type: 'Email',
      content: `Mock follow-up email: ${commContent || 'No content'}`,
      timestamp: dayjs().format('YYYY-MM-DD HH:mm')
    };
    setLocalCommunications([emailComm, ...localCommunications]);
    setCommContent('');
    message.success('Mock email sent!');
  };

  return (
    <Modal
      title={studentData ? `Student Profile - ${studentData.name}` : "Student Profile"}
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
      width={800}
      footer={null}
    >
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Basic Info",
            children: (
              <>
                <div style={{ marginBottom: 16 }}>
                  <strong>Application Progress:</strong>
                  <Progress
                    percent={studentData ? getStageProgress(studentData.applicationStatus) : 0}
                    status="active"
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                  />
                </div>
                <Descriptions bordered column={1} size="small">
                  <Descriptions.Item label="ID">{studentData?.id}</Descriptions.Item>
                  <Descriptions.Item label="Name">{studentData?.name}</Descriptions.Item>
                  <Descriptions.Item label="Email">{studentData?.email}</Descriptions.Item>
                  <Descriptions.Item label="Grade">{studentData?.grade}</Descriptions.Item>
                  <Descriptions.Item label="Country">{studentData?.country}</Descriptions.Item>
                  <Descriptions.Item label="Status">{studentData?.applicationStatus}</Descriptions.Item>
                  <Descriptions.Item label="Last Active">{studentData?.lastActive}</Descriptions.Item>
                </Descriptions>
              </>
            )
          },
          {
            key: "2",
            label: "Interaction Timeline",
            children: (
              <Timeline mode="left">
                {interactions.map(ev => (
                  <Timeline.Item key={ev.id} color="blue" label={new Date(ev.createdAt).toLocaleString()}>
                    <strong>{ev.type}</strong> — {ev.details}
                  </Timeline.Item>
                ))}
              </Timeline>
            )
          },
          {
            key: "3",
            label: "Communications",
            children: (
              <List
                bordered
                dataSource={localCommunications}
                renderItem={(comm) => (
                  <List.Item key={comm.id}>
                    <List.Item.Meta
                      title={`${comm.type} • ${comm.timestamp}${comm.dueDate ? ` (Due: ${comm.dueDate})` : ''}`}
                      description={comm.content}
                    />
                  </List.Item>
                )}
              />
            )
          },
          {
            key: "4",
            label: "Internal Notes",
            children: (
              <Card>
                <TextArea
                  rows={3}
                  placeholder="Write a note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <Button
                  type="primary"
                  onClick={handleAddNote}
                  style={{ marginTop: 8 }}
                >
                  Add Note
                </Button>
                <List
                  style={{ marginTop: 16 }}
                  dataSource={localNotes}
                  renderItem={(note) => (
                    <List.Item
                      key={note.id}
                      actions={[
                        editingNoteId === note.id ? (
                          <>
                            <a onClick={() => { handleEditNote(note.id, editingText); setEditingNoteId(null); }}>Save</a>
                            <a onClick={() => setEditingNoteId(null)}>Cancel</a>
                          </>
                        ) : (
                          <>
                            <a onClick={() => { setEditingNoteId(note.id); setEditingText(note.text); }}>Edit</a>
                            <a onClick={() => handleDeleteNote(note.id)}>Delete</a>
                          </>
                        )
                      ]}
                    >
                      <List.Item.Meta
                        title={`${note.author} • ${new Date(note.createdAt).toLocaleString()}`}
                        description={editingNoteId === note.id ? (
                          <Input value={editingText} onChange={(e) => setEditingText(e.target.value)} />
                        ) : (
                          note.text
                        )}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            )
          },
          {
            key: "5",
            label: "Communication Tools",
            children: (
              <Card>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Select value={commType} onChange={val => setCommType(val)} style={{ width: 200 }}>
                    <Option value="Call">Call</Option>
                    <Option value="Email">Email</Option>
                    <Option value="Meeting">Meeting</Option>
                    <Option value="Task">Task / Reminder</Option>
                  </Select>

                  {commType === 'Task' && (
                    <DatePicker
                      placeholder="Select due date"
                      value={commDueDate}
                      onChange={date => setCommDueDate(date)}
                    />
                  )}

                  <TextArea
                    placeholder="Enter communication notes or task details..."
                    value={commContent}
                    onChange={e => setCommContent(e.target.value)}
                    rows={3}
                  />

                  <Space>
                    <Button
                      type="primary"
                      icon={<FileTextOutlined />}
                      onClick={handleLogCommunication}
                    >
                      Log {commType}
                    </Button>
                    {commType === 'Email' && (
                      <Button
                        type="default"
                        icon={<SendOutlined />}
                        onClick={handleSendMockEmail}
                      >
                        Send Mock Email
                      </Button>
                    )}
                  </Space>

                  <List
                    header={<b>Communication Log</b>}
                    dataSource={localCommunications}
                    renderItem={comm => (
                      <List.Item key={comm.id}>
                        <List.Item.Meta
                          title={`${comm.type} • ${comm.timestamp}${comm.dueDate ? ` (Due: ${comm.dueDate})` : ''}`}
                          description={comm.content}
                        />
                      </List.Item>
                    )}
                  />
                </Space>
              </Card>
            )
          }
        ]}
      />
    </Modal>
  );
};

export default StudentDetail;
