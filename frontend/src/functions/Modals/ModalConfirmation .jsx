import React from 'react';
import './ModalConfirmation.css';

const ModalConfirmation = ({ isOpen, message, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal">
        <p className='message-confirm'>{message}</p>
        <div className="modal-buttons">
          <button className='cancel-button' onClick={onClose}>Annuler</button>
          <button className='button-confirm primary' onClick={onConfirm}>Confirmer</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
