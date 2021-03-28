/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';
import Button from '../Button';
import { ReactComponent as CheckCircle } from './icons/Check-circle.svg';

function Modal({ onCloseModal, message, body }) {
  return (
    <div className={styles.modal}>
      <div className={styles['modal-dialog']}>
        <div className={styles['modal-header']}>
          <span className={styles['modal-close']}>&times;</span>
          <div className={styles['modal-status']}>
            <CheckCircle />
            <h3 className={styles['modal-title']}>{message}</h3>
          </div>
        </div>
        <div className={styles['modal-body']}>
          <div className={styles['modal-content']}>{body}</div>
        </div>
        <div className={styles['modal-footer']}>
          <div className={styles['modal__submit-button']}>
            <Button
              type="button"
              description="Back to Catalog"
              onClick={onCloseModal}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  body: PropTypes.element,
  message: PropTypes.string,
  onCloseModal: PropTypes.func,
};

export default Modal;
