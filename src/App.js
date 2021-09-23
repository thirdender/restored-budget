import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './App.module.scss';

const idCleanerRe = /[^\w\d-]/g;

function Card({ title, titleIcon, rows }) {
  return (
    <form className="card">
      <div className="card-body">
        <h5 className="card-title">
          <FontAwesomeIcon icon={titleIcon} className="me-2" />
          {title}
        </h5>
        {rows.map((label) => {
          const id = `${title}-${label}`.replace(idCleanerRe, '');
          return (
            <div className="row mt-4 mb-3">
              <label htmlFor={id} className="col-sm-10 col-form-label">
                {label}
              </label>
              <div className="col-sm-2">
                <input type="number" className="form-control" id={id} />
              </div>
            </div>
          );
        })}
        <div className="d-flex justify-content-end">
          <a href="/" className="btn btn-success ms-2">
            Create account
          </a>
          <button
            type="submit"
            className="btn btn-primary ms-2"
          >
            Sign in
          </button>
        </div>
      </div>
    </form>
  );
}

function App() {
  // Card component: https://getbootstrap.com/docs/5.0/components/card/
  // Form layout: https://getbootstrap.com/docs/5.0/forms/layout/
  return (
    <div className={styles.App}>
      <h1 className="visually-hidden">Test Monkeys</h1>
      <div className="container my-5">
        <div className="row">
          <div className="col">
            <Card
              titleIcon={['fas', 'home']}
              title="Home"
              rows={[
                'Mortgage/Rent',
                'Homeowner\'s/Renter\'s Insurance',
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
