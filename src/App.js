import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Masonry from 'masonry-layout';
import { TotalsContext } from './contexts';
import Navbar from './Navbar';
import Row from './Row';
import styles from './App.module.scss';

const idCleanerRe = /[^\w\d-]/g;
const { useTotalsDispatch, useTotalsState } = TotalsContext;

function Card({ title, titleIcon, rows }) {
  const group = title.replace(idCleanerRe, '');
  const state = useTotalsState();
  const expenses = state.expenses[group] || {};
  const dispatch = useTotalsDispatch();
  return (
    <div className="col-lg-6 my-3">
      <form className="card">
        <div className="card-header">
          <h5 className="card-title">
            <div className="row">
              <div className="col-9">
                <FontAwesomeIcon icon={titleIcon} className="me-2" />
                {title}
              </div>
              <div className="col-3">
                {'$'}
                {Object.values(expenses).reduce((total, x) => total + x, 0).toLocaleString()}
              </div>
            </div>
          </h5>
        </div>
        <div className="card-body py-1">
          {rows.map((label) => {
            const key = label.replace(idCleanerRe, '');
            const id = `${group}-${key}`;
            return (
              <Row
                label={label}
                key={key}
                id={id}
                value={expenses[key]}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (!isNaN(value)) {
                    dispatch({ type: 'setExpense', group, name: key, value });
                  }
                }}
              />
            );
          })}
          {/*
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
          */}
        </div>
      </form>
    </div>
  );
}

function App() {
  // Card component: https://getbootstrap.com/docs/5.0/components/card/
  // Form layout: https://getbootstrap.com/docs/5.0/forms/layout/

  // Initialize Masonry Layout to layout all the cards nice and neat
  const elementMasonryGrid = useRef(null);
  useEffect(() => {
    if (elementMasonryGrid.current) {
      new Masonry(elementMasonryGrid.current, {
        percentPosition: true,
      });
    }
  }, []);

  return (
    <div className={styles.App}>
      <Navbar />
      <div className="container my-5">
        <div ref={elementMasonryGrid} className="row">
          <Card
            title="Home"
            key="home"
            titleIcon={['fas', 'home']}
            rows={[
              'Mortgage/Rent',
              'Homeowner\'s/Renter\'s Insurance',
              'Property Taxes',
              'Maintenance/Repairs',
              'Gas',
              'Electric',
              'Water',
              'Sewage',
              'Trash',
              'Internet',
              'Furniture',
              'Outdoors',
              'Other',
            ]}
          />
          <Card
            title="Food"
            key="food"
            titleIcon={['fas', 'hamburger']}
            rows={[
              'Groceries',
              'Restaurants/Take Out',
            ]}
          />
          <Card
            title="Auto"
            key="auto"
            titleIcon={['fas', 'car']}
            rows={[
              'Fuel',
              'Car Insurance',
              'Maintenance/Repairs',
              'Parking/Tolls',
              'Car Replacement',
            ]}
          />
          <Card
            title="Generosity"
            key="generosity"
            titleIcon={['fas', 'dove']}
            rows={[
              'Church Tithes/Ofering',
              'Charities',
              'Compassion/Care',
              'Gifts (Birthday, Holiday, etc.)',
            ]}
          />
          <Card
            title="Medical/Health"
            key="medical"
            titleIcon={['fas', 'medkit']}
            rows={[
              'Doctor\'s Bills/Co-Pays',
              'Medications',
              'Health Insurance',
              'Dental/Vision Care',
            ]}
          />
          <Card
            title="Personal Expenses"
            key="personal"
            titleIcon={['fas', 'tshirt']}
            rows={[
              'Clothing',
              'Beauty/Barber',
              'Cell Phone',
              'Laundry',
              'Entertainment',
              'Pet Supplies',
              'Travel/Vacation',
              'Spending Money',
              'Other',
            ]}
          />
          <Card
            title="Family"
            key="family"
            titleIcon={['fas', 'baby']}
            rows={[
              'Education/School Supplies',
              'Child Care/Babysitting',
              'Date Night',
              'Children\'s Needs',
              'Other',
            ]}
          />
          <Card
            title="Investments"
            key="investments"
            titleIcon={['fas', 'glasses']}
            rows={[
              'Savings',
              'Retirement',
              'Life Insurance',
              'Other',
            ]}
          />
          <Card
            title="Debt"
            key="debt"
            titleIcon={['fas', 'money-check-alt']}
            rows={[
              'Student Loans',
              'Credit Cards',
              'Other',
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
