import { useReducer, useContext } from "react";
import api from "../../utils/api";
import UserContext from "./userContext";
import UserReducer from "./userReducer";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_LOADING,
  REGISTER,
} from "../types";
import setAuthToken from "../../utils/setAuthToken";
import { useToast } from "@chakra-ui/react";

const UserState = (props) => {
  const initalState = {
    user: {},
    loading: true,
    error: null,
    isAuthenticated: false,
    token: localStorage.getItem("token"),
  };
  const toast = useToast();
  const [state, dispatch] = useReducer(UserReducer, initalState);

  // načíst uživatele
  const loadUser = async () => {
    dispatch({ type: SET_LOADING, payload: false });
    try {
      const res = await api.get("/auth");

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      if (error.response.status !== 401) {
        const errors = error.response.data;
        if (errors.msg) {
          toast({
            title: errors.msg,
            status: "error",
            duration: 9000,
            position: "bottom-right",
            isClosable: true,
          });
        }
        if (!errors && error.message) {
          toast({
            title: error.message,
            status: "error",
            duration: 9000,
            position: "bottom-right",
            isClosable: true,
          });
        }
        if (Array.isArray(errors.errors)) {
          errors.errors.forEach((error) =>
            toast({
              title: error.msg,
              status: "error",
              duration: 9000,
              position: "bottom-right",
              isClosable: true,
            })
          );
        }
      }
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // zaregistrovat
  const register = async (formData) => {
    dispatch({ type: SET_LOADING, payload: false });
    try {
      const res = await api.post("/users", formData);
      if (res.status == 200) {
        toast({
          title: "Tvůj účet byl vytvořen",
          status: "success",
          duration: 9000,
          position: "bottom-right",
          isClosable: true,
        });

        toast({
          title: "Prosím ověř si email",
          status: "info",
          duration: 9000,
          position: "bottom-right",
          isClosable: true,
        });
      }
      dispatch({
        type: REGISTER,
      });
    } catch (error) {
      const errors = error.response.data;
      if (errors.msg) {
        toast({
          title: errors.msg,
          status: "error",
          duration: 9000,
          position: "bottom-right",
          isClosable: true,
        });
      }
      if (!errors && error.message) {
        toast({
          title: error.message,
          status: "error",
          duration: 9000,
          position: "bottom-right",
          isClosable: true,
        });
      }
      if (Array.isArray(errors.errors)) {
        errors.errors.forEach((error) =>
          toast({
            title: error.msg,
            status: "error",
            duration: 9000,
            position: "bottom-right",
            isClosable: true,
          })
        );
      }
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  // Přihlásit
  const login = async (email, password) => {
    dispatch({ type: SET_LOADING, payload: false });
    const body = { email, password };

    try {
      const res = await api.post("/auth", body);
      setAuthToken(res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (error) {
      const errors = error.response.data;
      if (errors.msg) {
        toast({
          title: errors.msg,
          status: "error",
          duration: 9000,
          position: "bottom-right",
          isClosable: true,
        });
      }
      if (!errors && error.message) {
        toast({
          title: error.message,
          status: "error",
          duration: 9000,
          position: "bottom-right",
          isClosable: true,
        });
      }
      if (Array.isArray(errors.errors)) {
        errors.errors.forEach((error) =>
          toast({
            title: error.msg,
            status: "error",
            duration: 9000,
            position: "bottom-right",
            isClosable: true,
          })
        );
      }
      dispatch({
        type: AUTH_ERROR,
        payload: error,
      });
    }
  };

  // Odhlásit
  const logout = () => {
    dispatch({ type: LOGOUT });
    setAuthToken();
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        login,
        loadUser,
        logout,
        register,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
