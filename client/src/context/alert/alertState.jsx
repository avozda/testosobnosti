import { useReducer } from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import {SET_ALERT, REMOVE_ALERT } from "../types"
import { v4 as uuidv4 } from 'uuid';

const AlertState = props => {
    const initalState = {
        alerts:[]
    }
 
    const [state, dispatch] = useReducer(AlertReducer, initalState);

    const setAlert = (msg, alertType, timeout = 0) => {
      const id = uuidv4();
      dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
      });
    
      setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
    };

    return <AlertContext.Provider value={
        {
            alerts:state.alerts,
           setAlert
           }
    } >
        {props.children}
    </AlertContext.Provider>

}

export default AlertState;