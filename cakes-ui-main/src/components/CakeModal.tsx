import React, { Props, useState } from "react";
import { Button, Modal } from "antd";
import { CakesType, CakeModalPropsType } from '../types/types'
import ProgressBar from "@ramonak/react-progress-bar";

import '../assets/css/CakeModal.scss'

const CakeModal = ({ visible, closeModal, cake, deleteCake }: CakeModalPropsType) => {
    const [showDelete, setShowDelete] = useState(Boolean);

    return (
        <>
            <Modal
                title={'Cake details'}
                centered
                width={'50%'}
                visible={visible}
                destroyOnClose
                cancelText={'Delete'}
                onCancel={closeModal}
                footer={[
                    <Button
                        type='default'
                        onClick={() => setShowDelete(true)}
                    >
                        Delete
                    </Button>,
                    <Button
                        type='primary'
                        onClick={closeModal}
                    >
                        OK
                    </Button>
                ]}
            >
                <img alt={cake.name} className={'img-modal'} src={cake.imageurl} />
                <div className='modal-end'>
                    <div><h4>Comment</h4>
                        <h5>{cake.comment}</h5></div><div><h4>Yum Factor ({cake?.yumfactor})</h4><ProgressBar labelSize={'8px'} height={'13px'} bgColor={'#693331'} completed={cake?.yumfactor ? (cake.yumfactor * 100) / 5 : 0} /></div></div>
            </Modal>
            <Modal
                centered
                zIndex={2000}
                visible={showDelete}
                okText='Yes'
                onOk={() => {
                    deleteCake(cake);
                    setShowDelete(false);
                    closeModal();
                }}
                cancelButtonProps={{ type: 'default' }}
                onCancel={() => setShowDelete(false)}
            >
                <div>Are you sure you want to delete?</div>
            </Modal>
        </>
    );
};

export default CakeModal;
