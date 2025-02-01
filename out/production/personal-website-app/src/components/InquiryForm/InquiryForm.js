import { app, db } from '../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import './InquiryForm.css';

const InquiryForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      console.log('Form data:', formData);

      // Add inquiry to Firestore collection
      const docRef = await addDoc(collection(db, 'inquiries'), formData);
      console.log('Document reference:', docRef);

      // Reset form and set submission state
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      console.log('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting the form:', error);
      setError('Failed to submit the form. Please try again.');
    }
  };

  return (
    <div className="inquiry-form-container">
      <h2>Contact Me</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>

      {submitted && <p className="success-message">Thank you for your message! </p>}
    </div>
  );
};

export default InquiryForm;
