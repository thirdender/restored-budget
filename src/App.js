import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TotalsContext } from './contexts';
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
            const name = label.replace(idCleanerRe, '');
            const id = `${group}-${name}`;
            return (
              <div className="row my-2" key={name}>
                <label htmlFor={id} className="col-sm-8 col-md-9 col-lg-8 col-xl-9 col-form-label">
                  {label}
                </label>
                <div className="col-sm-4 col-md-3 col-lg-4 col-xl-3">
                  <input
                    type="number"
                    className="form-control"
                    id={id}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (!isNaN(value)) {
                        dispatch({ type: 'setExpense', group, name, value });
                      }
                    }}
                    />
                </div>
              </div>
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
  return (
    <div className={styles.App}>
      <nav className={`${styles.Nav} navbar sticky-top navbar-dark`}>
        <div className="container">
          <a className="navbar-brand me-auto" href="#">Personal Budget</a>
          <form className="d-flex">
            <input
              className="form-control me-2"
              placeholder="Income"
              aria-label="Income"
              type="number"
            />
          </form>
        </div>
      </nav>
      <div className="container my-5">
        <div className="row" data-masonry='{"percentPosition": true }'>
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
