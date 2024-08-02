import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../styles/Modal.css";
import { useTranslation } from 'react-i18next';

const CustomModal = ({ isVisible, handleClose }) => { 
  const {t} = useTranslation();
  return (
    <Modal show={isVisible} onHide={handleClose} centered className='error-modal'>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.info')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('modal.msg1')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} className='modal-button'>
        {t('modal.close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
