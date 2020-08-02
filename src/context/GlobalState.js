import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer'

const initialState = {
    employees: [
        { id: 5, name: 'Ishan Manandhar', location: 'Kathmandu', designation: 'Frontend Dev' }
    ]
}

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function removeEmployee(id) {
        dispatch({
            type: 'REMOVE_EMPLOYEE',
            payload: id
        });
    };

    function addEmployee(employees) {
        dispatch({
            type: 'ADD_EMPLOYEES',
            payload: employees
        });
    };

    function editEmployee(employees) {
        dispatch({
            type: 'EDIT_EMPLOYEE',
            payload: employees
        });
    };
	
	useEffect(() => {
	  // Start fetching and fire up the loading state
	  fetch('http://localhost:8080/api/listings')
    .then(response => response.json())
    .then(data => {
        // let employees=data;
      // We got the data so lets add it to the state
      dispatch({ type: 'listing', payload: data.data })
      console.log(data);
    })
    },
	[]);

	
    return (<GlobalContext.Provider value={{
        useEffect:state.employees,
        removeEmployee,
        addEmployee,
        editEmployee
    }}>
        {children}
    </GlobalContext.Provider>);
}