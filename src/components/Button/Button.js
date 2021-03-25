/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ type, description, ...props }) => {
  return (
    <button type={type} className={styles.button} {...props}>
      {description}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  description: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  description: 'button',
};

export default Button;
