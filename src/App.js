import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().min(6, 'Username must be at least 6 characters').required('Username is required'),
  password: yup.string().min(7, 'Password must be at least 7 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().matches(/^\d+$/, 'Phone number must contain only digits').min(11, 'Phone number must be exactly 11 digits').max(11, 'Phone number must be exactly 11 digits').required('Phone number is required')
});

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data); // Here you can submit the form data to the backend
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">User Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            name="username"
            {...register('username')}
          />
          {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            name="password"
            {...register('password')}
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            name="confirmPassword"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name="email"
            {...register('email')}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            name="phone"
            {...register('phone')}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-3">Register</button>
      </form>
    </div>
  );
}

export default App;






