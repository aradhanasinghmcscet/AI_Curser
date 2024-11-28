import React, { useState } from 'react';
import './RegistrationForm.css';
import usePostSubmit from '../../hooks/usePostSubmit';
import API_CONFIG from '../../config/api.js';

function RegistrationForm() {
  const {
    submitData,
    loading,
    error,
    success,
    reset
  } = usePostSubmit(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // First Name validation
    if (!formData.firstName.trim()) {
      tempErrors.firstName = 'First name is required';
      isValid = false;
    } else if (!/^[A-Za-z]{2,}$/.test(formData.firstName.trim())) {
      tempErrors.firstName = 'First name must contain only letters and be at least 2 characters long';
      isValid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      tempErrors.lastName = 'Last name is required';
      isValid = false;
    } else if (!/^[A-Za-z]{2,}$/.test(formData.lastName.trim())) {
      tempErrors.lastName = 'Last name must contain only letters and be at least 2 characters long';
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      tempErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      tempErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
      tempErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character';
      isValid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      tempErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // Phone Number validation
    if (!formData.phoneNumber) {
      tempErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/[-()\s]/g, ''))) {
      tempErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    // Date of Birth validation
    if (!formData.dateOfBirth) {
      tempErrors.dateOfBirth = 'Date of birth is required';
      isValid = false;
    } else {
      const age = new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear();
      if (age < 18) {
        tempErrors.dateOfBirth = 'You must be at least 18 years old';
        isValid = false;
      }
    }

    // Gender validation
    if (!formData.gender) {
      tempErrors.gender = 'Please select a gender';
      isValid = false;
    }

    // Address validation
    if (!formData.address.trim()) {
      tempErrors.address = 'Address is required';
      isValid = false;
    }

    // City validation
    if (!formData.city.trim()) {
      tempErrors.city = 'City is required';
      isValid = false;
    }

    // Country validation
    if (!formData.country.trim()) {
      tempErrors.country = 'Country is required';
      isValid = false;
    }

    // Zip Code validation
    if (!formData.zipCode.trim()) {
      tempErrors.zipCode = 'Zip code is required';
      isValid = false;
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode.trim())) {
      tempErrors.zipCode = 'Please enter a valid zip code';
      isValid = false;
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      tempErrors.agreeToTerms = 'You must agree to the terms and conditions';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const result = await submitData(formData);
      if (result.success) {
        setSubmitted(true);
        // Optional: Clear form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phoneNumber: '',
          dateOfBirth: '',
          gender: '',
          address: '',
          city: '',
          country: '',
          zipCode: '',
          agreeToTerms: false
        });
      }
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration Form</h2>
      {loading && (
        <div className="loading-message">
          Processing your registration...
        </div>
      )}
      {error && (
        <div className="error-banner">
          Registration failed: {error}
          <button onClick={reset} className="retry-button">Try Again</button>
        </div>
      )}
      {success ? (
        <div className="success-message">
          Registration successful! Thank you for signing up.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number *</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={errors.phoneNumber ? 'error' : ''}
              />
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth *</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={errors.dateOfBirth ? 'error' : ''}
              />
              {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender *</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={errors.gender ? 'error' : ''}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address *</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? 'error' : ''}
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? 'error' : ''}
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="country">Country *</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={errors.country ? 'error' : ''}
              />
              {errors.country && <span className="error-message">{errors.country}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="zipCode">Zip Code *</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className={errors.zipCode ? 'error' : ''}
              />
              {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              I agree to the terms and conditions *
            </label>
            {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
          </div>

          <button 
            type="submit" 
            className="submit-button" 
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      )}
    </div>
  );
}

export default RegistrationForm; 