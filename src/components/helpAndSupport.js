import './helpAndSupport.css';

import React from 'react';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const helpAndSupport = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="myInfoTop">
        <ArrowBack
          style={{ marginRight: '20px' }}
          onClick={() => navigate(-1)}
        />
        Contact Us
      </div>
      <div className="help-and-support">

        <h1>Contact Us</h1>

        <p>You may contact us using the information below:</p>

        <ul>
          <li>
            <p>
              <strong>Merchant Legal entity name:</strong>
              {' '}
              KARTAMI FINTECH PRIVATE
              LIMITED
            </p>
          </li>
          <li>
            <p>
              <strong>Registered Address:</strong>
              {' '}
              universal trade tower, sector 49, gurgaon, PIN: 122018
            </p>
          </li>
          <li>
            <p>
              <strong>Operational Address:</strong>
              {' '}
              universal trade tower, sector 49, gurgaon, PIN: 122018
            </p>
          </li>
          <li>
            <p>
              <strong>Email ID:</strong>
              {' '}
              <a href="mailto:info@Mangogames.fun">info@Mangogames.fun</a>
            </p>
          </li>
        </ul>

        <p>Thank you for reaching out to us!</p>
        <div style={{ display: 'flex', marginTop: "135px", flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <p>
            <strong>Designed and Developed by:</strong>
            {' '}
          </p>
          <p>
            KARTAMI FINTECH PRIVATE
            LIMITED
          </p>
        </div>
      </div>
    </>
  );
}

export default helpAndSupport;
