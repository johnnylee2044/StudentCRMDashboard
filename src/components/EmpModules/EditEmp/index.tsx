import React,{useState} from 'react';
import { Button, Flex, Radio, Slider } from 'antd';
import type { ConfigProviderProps } from 'antd';
import FormPopup from '../addEMPForm/formPopup';
type SizeType = ConfigProviderProps['componentSize'];

const Toolbar: React.FC = () => {
  const [gapSize, setGapSize] = React.useState<SizeType | 'customize'>('small');
  const [customGapSize, setCustomGapSize] = React.useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => setIsModalOpen(false);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  


  return (
    <Flex gap="middle" vertical className='my-16'>
      <Flex gap={gapSize !== 'customize' ? gapSize : customGapSize}>
        <Button type="primary" onClick={showModal}>New</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Flex>
      <FormPopup isModalOpen={isModalOpen} handleCancel={handleCancel}/>
    </Flex>
  );
};

export default Toolbar;