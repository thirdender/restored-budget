import React, { useRef } from 'react';
import { TotalsContext } from './contexts';
import Row from './Row';
import logo from './logo.svg';
import styles from './Navbar.module.scss';

const { useTotalsDispatch, useTotalsState } = TotalsContext;

function Navbar() {
  const elementButton = useRef(null);
  const elementCollapse = useRef(null);
  const dispatch = useTotalsDispatch();
  const { monthlyTakeHome, total } = useTotalsState();

  return (
    <nav className={`${styles.Nav} navbar sticky-top navbar-dark`}>
      <div className="container">
        <a className="navbar-brand me-auto" href="https://restoredchurch.org/media/?sapurl=Lys5cGpnL2xiL21zLys2a2pmbTNjP2JyYW5kaW5nPXRydWUmZW1iZWQ9dHJ1ZSZyZWNlbnRSb3V0ZT1hcHAud2ViLWFwcC5saWJyYXJ5Lmxpc3QmcmVjZW50Um91dGVTbHVnPSUyQnh2cXBmbXY=">
          <img src={logo} className={styles.Logo} alt="Restored Church Logo" />
          Personal Budget Tool
        </a>
        <button
          ref={elementButton}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="true"
          aria-label="Toggle navigation"
          onClick={() => {
            const button = elementButton.current;
            const collapse = elementCollapse.current;
            if (!(button && collapse)) {
              return;
            }
            const open = button.getAttribute('aria-expanded') === 'false'
            if (open) {
              button.setAttribute('aria-expanded', 'true');
              button.className = 'navbar-toggler';
              collapse.className = 'collapse navbar-collapse show';
            } else {
              button.setAttribute('aria-expanded', 'false');
              button.className = 'navbar-toggler collapsed';
              collapse.className = 'collapse navbar-collapse';
            }
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          ref={elementCollapse}
          id="navbarScroll"
          className="collapse navbar-collapse show"
        >
          <div className="navbar-nav-scroll">
            <div className="card mt-4 mb-2">
              <div className="card-header">
                <div className="card-title">
                  Totals
                </div>
              </div>
              <div className="card-body py-1">
                <Row
                  label="Monthly Take Home Pay"
                  id="monthly-take-home"
                  value={monthlyTakeHome}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (!isNaN(value)) {
                      dispatch({ type: 'setMonthlyTakeHome', value });
                    }
                  }}
                />
                <Row
                  label="- Category Totals"
                  id="category-totals"
                  value={total}
                  readOnly={true}
                />
                <Row
                  label="Monthly Margin/Deficit"
                  id="monthly-deficit"
                  value={monthlyTakeHome - total}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
