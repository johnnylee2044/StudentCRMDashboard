import { Modal } from "antd";
import { FC, useState } from "react";
import AddEMPForm from "./formContent";

// Define prop types
interface FormPopupProps {
  isModalOpen: boolean;
  handleCancel: () => void;
}


const FormPopup: FC<FormPopupProps> = ({ isModalOpen, handleCancel }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
      const handleOk = () => {
        
    setConfirmLoading(true);
    setTimeout(() => {
        handleCancel();
      setConfirmLoading(false);
    }, 2000);
    
  };
  return (
    <Modal
      title="New Employee"
      open={isModalOpen}
      onCancel={handleCancel}
      width={400}
      onOk={handleOk}
      okText="Submit"
      confirmLoading={confirmLoading}
      centered
      closable
    >
      <AddEMPForm/>
    </Modal>
  );
};

export default FormPopup;