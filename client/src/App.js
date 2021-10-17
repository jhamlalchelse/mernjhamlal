import React, { createContext, useReducer } from "react";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Error from "./components/Error/Error";
import Logout from "./components/Logout/Logout";
import { Route, Switch } from "react-router-dom";
import './App.css'
import { initialState, reducer } from "./reducer/UseReducer";


// 1: createContext
export const UserContext = createContext()

const Switching = () => {
  return(
    <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route component={Error} /> 
      </Switch>
  )
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <UserContext.Provider value={{state,dispatch}}>
      <Navbar/>
      <Switching/>
      </UserContext.Provider>
    </>
  );
};

export default App;
