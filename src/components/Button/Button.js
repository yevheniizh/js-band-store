/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ disabled, type, description, ...props }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={styles.button}
      {...props}
    >
      {description}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.string,
  description: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  type: 'button',
  description: 'button',
};

export default Button;
