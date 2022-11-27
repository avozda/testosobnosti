import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import NotFound from "./pages/NotFound";
import Alert from "./components/Alert"
import Main from "./pages/secure/Main";
import Test from "./pages/secure/Test";
import PrivateRoute from "./components/PrivateRoute";
import {Fragment, useEffect, useContext} from "react";
import setAuthToken from "./utils/setAuthToken"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import UserContext from "./context/user/userContext";
import FinishedTestDetail from "./pages/secure/FinishedTestDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Statistics from "./pages/secure/Statistics";
import 'regenerator-runtime/runtime';

function App() {

  const userContext = useContext(UserContext)


  useEffect(()=>{
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    userContext.loadUser();
  }, [])

  return (
    <Router>
    <Fragment>
      <header>
        {userContext.isAuthenticated && <Navbar/>}
      </header>
      <main>
        <Alert/>
        <Routes>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/" element={<PrivateRoute><Main/></PrivateRoute>}/>
          <Route exact path="/test" element={<PrivateRoute><Test/></PrivateRoute>}/>
          <Route exact path="/result/:id" element={<PrivateRoute><FinishedTestDetail/></PrivateRoute>}/>
          <Route exact path="/statistics" element={<PrivateRoute><Statistics/></PrivateRoute>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        </main>
        <footer>
          <Footer/>
        </footer>
    </Fragment>
    </Router>
  )
}

export default App
