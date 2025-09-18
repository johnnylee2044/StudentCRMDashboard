import React from 'react';
import { useEffect,useState } from 'react';
import { 
  Space, 
  Table, 
  Tag, 
  Card, 
  Row, 
  Col, 
  Input, 
  Select, 
  Button, 
  DatePicker,
  Statistic 
} from 'antd';
import { 
  FilterOutlined, 
  SearchOutlined, 
  ReloadOutlined,
  UserOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  AlertOutlined 
} from '@ant-design/icons';
import { Student,ApplicationStatus,getStudents,Intent } from '@/apis/Student/StudentAPI';
import StudentDetail from './studentDetail';
const { Column } = Table;
const { Option } = Select;
const { RangePicker } = DatePicker;



const getStatusConfig=(status:ApplicationStatus)=>{
  const config={
    EXPLORING: { color: 'blue', text: 'EXPLORING' },
    SHORTLISTING: { color: 'orange', text: 'SHORTLISTING' },
    APPLYING: { color: 'green', text: 'APPLYING' },
    SUBMITTED: { color: 'purple', text: 'SUBMITTED' }
  };
  return config[status] || { color: 'default', text: status };
}

const getIntentConfig = (intent: Intent) => {
  const config = {
    HIGH: { color: 'red', text: 'HIGH' },
    MEDIUM: { color: 'orange', text: 'MEDIUM' },
    LOW: { color: 'green', text: 'LOW' }
  };
  return config[intent] || { color: 'default', text: intent };
};
const StudentList: React.FC = () => {
  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<Student[]>([]);
    const [filters, setFilters] = useState({
    search: '',
    applicationStatus: '' as ApplicationStatus | '',
    intent: '' as Intent | '',
    country: '',
    lastActiveRange: [] as any[],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const handleOpenModal = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = await getStudents();
        setData(students);
      } catch (error) {
        console.error('Get Data Failed:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
    useEffect(() => {
    let result = data;
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(student =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.phone.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.applicationStatus) {
      result = result.filter(student => student.applicationStatus === filters.applicationStatus);
    }

    if (filters.intent) {
      result = result.filter(student => student.intent === filters.intent);
    }

    if (filters.country) {
      result = result.filter(student => student.country === filters.country);
    }

    if (filters.lastActiveRange && filters.lastActiveRange.length === 2) {
      const [start, end] = filters.lastActiveRange;
      result = result.filter(student => {
        const studentDate = new Date(student.lastActive);
        return studentDate >= start && studentDate <= end;
      });
    }

    setFilteredData(result);
  }, [data, filters]);

  console.log("this is data",data)
  const countries = Array.from(new Set(data.map(student => student.country))).sort();

  const resetFilters = () => {
    setFilters({
      search: '',
      applicationStatus: '',
      intent: '',
      country: '',
      lastActiveRange: [],
    });
  };
  const stats = {
    total: data.length,
    exploring: data.filter(s => s.applicationStatus === 'EXPLORING').length,
    applying: data.filter(s => s.applicationStatus === 'APPLYING').length,
    submitted: data.filter(s => s.applicationStatus === 'SUBMITTED').length,
    highIntent: data.filter(s => s.intent === 'HIGH').length,
  };

  return (
      <>
      <div style={{ padding: '20px' }}>
      
        <Row gutter={16} style={{ marginBottom: 20 }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Students"
                value={stats.total}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="EXPLORING"
                value={stats.exploring}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="APPLYING"
                value={stats.applying}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="HighIntent"
                value={stats.highIntent}
                prefix={<AlertOutlined />}
              />
            </Card>
          </Col>
        </Row>

    
        <Card 
          title="Filter Condition" 
          style={{ marginBottom: 20 }}
          extra={
            <Button 
              icon={<ReloadOutlined />} 
              onClick={resetFilters}
            >
              Reset Filter
            </Button>
          }
        >
          <Row gutter={[16, 16]} align="middle">
            <Col span={6}>
              <Input
                placeholder="Search name,email or phone number..."
                prefix={<SearchOutlined />}
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </Col>
            <Col span={4}>
              <Select
                placeholder="Application Status"
                style={{ width: '100%' }}
                value={filters.applicationStatus || undefined}
                onChange={(value) => setFilters({...filters, applicationStatus: value})}
                allowClear
              >
                <Option value="EXPLORING">EXPLORING</Option>
                <Option value="SHORTLISTING">SHORTLISTING</Option>
                <Option value="APPLYING">APPLYING</Option>
                <Option value="SUBMITTED">SUBMITTED</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select
                placeholder="Intent"
                style={{ width: '100%' }}
                value={filters.intent || undefined}
                onChange={(value) => setFilters({...filters, intent: value})}
                allowClear
              >
                <Option value="HIGH">HIGH</Option>
                <Option value="MEDIUM">MEDIUM</Option>
                <Option value="LOW">LOW</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select
                placeholder="Country"
                style={{ width: '100%' }}
                value={filters.country || undefined}
                onChange={(value) => setFilters({...filters, country: value})}
                allowClear
                showSearch
              >
                {countries.map(country => (
                  <Option key={country} value={country}>{country}</Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker
                style={{ width: '100%' }}
                placeholder={['Start Time', 'End Time']}
                onChange={(dates) => setFilters({...filters, lastActiveRange: dates || []})}
              />
            </Col>
          </Row>
        </Card>


        <div style={{ marginBottom: 16 }}>
          Show <Tag color="blue">{filteredData.length}</Tag> Students: 
          {filters.search && <Tag>Search: {filters.search}</Tag>}
          {filters.applicationStatus && (
            <Tag color={getStatusConfig(filters.applicationStatus as ApplicationStatus).color}>
              Status: {filters.applicationStatus}
            </Tag>
          )}
          {filters.intent && (
            <Tag color={getIntentConfig(filters.intent as Intent).color}>
              Intent: {filters.intent}
            </Tag>
          )}
        </div>

        <Table<Student> 
          dataSource={filteredData} 
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        >
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Country" dataIndex="country" key="country" />
          <Column
            title="Application Status"
            dataIndex="applicationStatus"
            key="applicationStatus"
            render={(status: ApplicationStatus) => {
              const config = getStatusConfig(status);
              return (
                <Tag color={config.color}>
                  {config.text}
                </Tag>
              );
            }}
          />
          <Column 
            title="Last Active" 
            dataIndex="lastActive" 
            key="lastActive"
            render={(date: string) => new Date(date).toLocaleString()}
          />
          <Column
            title="Intent"
            dataIndex="intent"
            key="intent"
            render={(intent: Intent) => {
              const config = getIntentConfig(intent);
              return (
                <Tag color={config.color}>
                  {config.text}
                </Tag>
              );
            }}
          />
          <Column
            title="Action"
            key="action"
            render={(_: any, record: Student) => (
              <Space size="middle">
                 <a onClick={() => handleOpenModal(record)}>Open</a>
                <a>Edit</a>
                <a>Delete</a>
              </Space>
            )}
          />
        </Table>
      </div>
       <StudentDetail
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  studentData={
    selectedStudent
      ? {
          id: selectedStudent.id,
          name: selectedStudent.name,
          email: selectedStudent.email,
          grade: selectedStudent.grade ?? "-", 
          country: selectedStudent.country,
          applicationStatus: selectedStudent.applicationStatus,
          lastActive: new Date(selectedStudent.lastActive).toLocaleString(),
        }
      : undefined
  }
  interactions={
    selectedStudent?.interactions?.map(i => ({
      id: i.id,
      type: i.type,
      details: i.title,   // map title to details
      createdAt: i.timestamp
    })) || []
  }
  communications={
    selectedStudent?.communications?.map(c => ({
      id: c.id,
      type: c.type,
      body: `${c.direction} • ${c.subject} — ${c.content}`,
      createdAt: c.timestamp
    })) || []
  }
/>
    </>
  );
};
export default StudentList;