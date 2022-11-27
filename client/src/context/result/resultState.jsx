import { useReducer, useContext } from "react";
import ResultContext from "./resultContext";
import ResultReducer from "./resultReducer";
import { GET_RESULTS, RESULTS_ERROR, GET_RESULT,  GET_STATISTICS} from "../types"
import AlertContext from "../alert/alertContext";
import api from "../../utils/api";


const ResultState = props => {
    const initalState = {
      resultDetail:{},
      userResults:[],
      allResults:[],
      loading: true,
      error: null
    }
 
    const [state, dispatch] = useReducer(ResultReducer, initalState);
    const alertContext = useContext(AlertContext)
    const {setAlert} = alertContext

    
    const getUsersResults = async ()=> {
      try {
         const res = await api.get('/answers');
       
         dispatch({
             type: GET_RESULTS,
             payload: res.data.reverse()
         });
     } catch (error) {
    
        const errors = error.response.data;
    
        if (errors) {
         setAlert(errors, 'error');
        }
         dispatch({
             type: RESULTS_ERROR,
             payload: error
         });
     }
  }
    const getStatistics = async ()=> {
      try {
         const res = await api.get('/answers/statistics');
         
       
         dispatch({
             type: GET_STATISTICS,
             payload: res.data
         });
     } catch (error) {
        const errors = error.response.data;
    
        if (errors) {
         setAlert(errors, 'error');
        }
         dispatch({
             type: RESULTS_ERROR,
             payload: error
         });
     }
  }
    const getResultDetail = async id => {
      try {
         const res = await api.get(`/answers/${id}`);
         dispatch({
             type: GET_RESULT,
             payload: res.data
         });
     } catch (error) {
        const errors = error.response.data;
    
        if (errors) {
         setAlert(errors, 'error');
        }
         dispatch({
             type: RESULTS_ERROR,
             payload: error
         });
     }
  }


    return <ResultContext.Provider value={
        {
          getUsersResults,
          getResultDetail,
          getStatistics,
          resultDetail: state.resultDetail,
          userResults:state.userResults,
          allResults:state.allResults,
          loading: state.loading,
          error: state.error
           }
    } >
        {props.children}
    </ResultContext.Provider>

}

export default ResultState;