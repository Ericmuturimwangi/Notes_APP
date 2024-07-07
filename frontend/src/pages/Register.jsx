
import React from 'react';
import Form from '../components/Form'; // Ensure correct path to Form component

function Register() {
  return (
    <Form route="api/user/register/" method="register" />
  );
}

export default Register;
