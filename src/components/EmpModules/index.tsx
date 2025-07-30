
import EMPTable from "@/components/EmpModules/EMPTable";
import Toolbar from "@/components/EmpModules/EditEmp";
import {Space} from 'antd'
const EMP = () => {
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Toolbar/>
      <EMPTable />
      </Space>

  );
};

export default EMP;