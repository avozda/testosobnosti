import { useReducer, useContext } from "react";
import api from "../../utils/api";
import UserContext from "./userContext";
import UserReducer from "./userReducer";
import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGOUT, SET_LOADING, REGISTER } from "../types"
import setAuthToken from "../../utils/setAuthToken";
import AlertContext from "../alert/alertContext";

const UserState = props => {
    const initalState = {
        user: {},
        loading: true,
        error: null,
        isAuthenticated: false,
        token: localStorage.getItem('token'),
    }
 
 
    const [state, dispatch] = useReducer(UserReducer, initalState);
    const alertContext = useContext(AlertContext)
    const {setAlert} = alertContext
  
    // načíst uživatele
    const loadUser = async () => {
        
        try {        
            const res = await api.get('/auth');
           
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (error) {
            if(error.response.data){
                const errors = error.response.data.errors;
    
                if (errors) {
                    errors.forEach(error => setAlert(error.msg, 'error'));
                }
         
                dispatch({
                    type: AUTH_ERROR,
                    payload: error.response.data.message
                 });
            }else {
                dispatch({
                    type: AUTH_ERROR,
                    payload: "Něco se nepovedlo"
                 });
                 setAlert(error.msg, 'Server neodpovídá')
            }
          
        }
    };

    // zaregistrovat
   const register = async formData => {
    
   try {
     
       const res = await api.post('/users', formData);
       if(res.status == 200){
           setAlert("Tvůj účet byl vytvořen", "success")
           setAlert("Prosím ověř si email", "info")

       }
       dispatch({
        type: REGISTER
    });
   } catch (error) {
       const errors = error.response.data.errors;
    
       if (errors) {
           errors.forEach(error => setAlert(error.msg, 'error'));
       }
       dispatch({
        type: AUTH_ERROR
    });
   }
   };
     
    // Přihlásit
    const login = async (email, password) => {
        
        const body = { email, password };
        
        try {
         
            const res = await api.post('/auth', body);
            setAuthToken(res.data.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (error) {
            const errors = error.response.data.errors;
            if (errors) {
                errors.forEach(error => setAlert(error.msg, 'error'));
            }
            dispatch({
                type: AUTH_ERROR,
                payload: errors
            });
        }
    };

    // Odhlásit
    const logout = () => {     
        dispatch({ type: LOGOUT });
        setAuthToken();
    }


    return <UserContext.Provider value={
        {
            user:state.user,
            loading: state.loading,
            error: state.error,
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            login,
            loadUser,
            logout,
            register
           }
    } >
        {props.children}
    </UserContext.Provider>

}

export default UserState;