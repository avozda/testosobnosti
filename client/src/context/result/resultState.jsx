import { useReducer, useContext } from "react";
import ResultContext from "./resultContext";
import ResultReducer from "./resultReducer";
import {
  GET_RESULTS,
  RESULTS_ERROR,
  GET_RESULT,
  GET_STATISTICS,
} from "../types";
import api from "../../utils/api";
import { useToast } from "@chakra-ui/react";

const ResultState = (props) => {
  const initalState = {
    resultDetail: {},
    userResults: [],
    allResults: [],
    loading: true,
    error: null,
  };
  const toast = useToast();
  const [state, dispatch] = useReducer(ResultReducer, initalState);
  const getUsersResults = async () => {
    try {
      const res = await api.get("/answers");

      dispatch({
        type: GET_RESULTS,
        payload: res.data.reverse(),
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
        type: RESULTS_ERROR,
        payload: error,
      });
    }
  };
  const getStatistics = async () => {
    try {
      const res = await api.get("/answers/statistics");

      dispatch({
        type: GET_STATISTICS,
        payload: res.data,
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
        type: RESULTS_ERROR,
        payload: error,
      });
    }
  };
  const getResultDetail = async (id) => {
    try {
      const res = await api.get(`/answers/${id}`);
      dispatch({
        type: GET_RESULT,
        payload: res.data,
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
        type: RESULTS_ERROR,
        payload: error,
      });
    }
  };

  return (
    <ResultContext.Provider
      value={{
        getUsersResults,
        getResultDetail,
        getStatistics,
        resultDetail: state.resultDetail,
        userResults: state.userResults,
        allResults: state.allResults,
        loading: state.loading,
        error: state.error,
      }}
    >
      {props.children}
    </ResultContext.Provider>
  );
};

export default ResultState;
