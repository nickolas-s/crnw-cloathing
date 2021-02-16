/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */

import React from 'react';
import CustomButtonContainer from './custom-button.styles';

const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;
