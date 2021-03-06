import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar } from 'antd';

const Mobile = ({ mobile }) => {
  if (mobile) {
    return (
      <>
        <h2>Your Mobile</h2>
        <h4>{mobile.mobile}</h4>
        <h4>Verfication Status: {mobile.isVerified ? 'Done' : 'Not Done'}</h4>
      </>
    );
  } else {
    return <h4>Unavailable</h4>;
  }
};

export default Mobile;
