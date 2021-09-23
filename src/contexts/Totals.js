import React, { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

const TotalsStateContext = createContext();
const TotalsDispatchContext = createContext();

const reducer = (state, action) => {
  let returnValue = {
    ...state,
    expenses: {},
  };
  Object.entries(state.expenses).forEach(([group, value]) => {
    returnValue.expenses[group] = { ...value };
  });
  switch (action.type) {
    case 'setExpense': {
      if (!(action.group in returnValue.expenses)) {
        returnValue.expenses[action.group] = {};
      }
      returnValue.expenses[action.group][action.name] = action.value;
      break;
    }
    case 'setExpenses': {
      returnValue.expenses = action.expenses;
      break;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
  return returnValue;
}

const TotalsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    expenses: {},
  });

  // Load saved values from localStorage once on page load
  useEffect(() => {
    try {
      const expenses = JSON.parse(localStorage.getItem('expenses')) || {};
      dispatch({ type: 'setExpenses', expenses });
    } catch (e) {
      console.log('Unable to load expenses from localStorage');
    }
  }, [dispatch]);

  return (
    <TotalsStateContext.Provider value={{
      ...state,
    }}>
      <TotalsDispatchContext.Provider value={dispatch}>
        {children}
      </TotalsDispatchContext.Provider>
    </TotalsStateContext.Provider>
  );
};
TotalsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useTotalsState = () => {
  const context = useContext(TotalsStateContext);
  if (context === undefined) {
    throw new Error('useTotalsState must be used within a TotalsProvider');
  }
  return context;
};

const useTotalsDispatch = () => {
  const context = useContext(TotalsDispatchContext);
  if (context === undefined) {
    throw new Error('useTotalsDispatch must be used within a TotalsProvider');
  }
  return context;
};

const TotalsContext = {
  TotalsProvider,
  useTotalsState,
  useTotalsDispatch,
};

export default TotalsContext;
