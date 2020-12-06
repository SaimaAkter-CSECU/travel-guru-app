import React, { Component, createContext, useState  } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import './App.css';
// import { useLocation } from 'react-router-dom';
import Home from './components/Home/Home'; 
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';

import Booking from './components/Booking/Booking';
import NotFound from './components/NotFound/NotFound';
import Hotels from './components/HotelDetails/Hotels';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [bookingInformation, setBookingInformation] = useState({});
    return (
      <UserContext.Provider value={{ user, setUser, bookingInformation, setBookingInformation}}>
        <div className={`${location.pathname === '/' || location.pathname.includes('home') || location.pathname.includes('booking') ? "home" : ""}`}>
          <Header></Header>
          <Router>
            <Switch>
              <Route path="/home">
                <Home></Home>
              </Route>
              <Route path="/login">
                  <Login></Login>
              </Route>
              <PrivateRoute path="/hotel/:locationId">
                <Hotels></Hotels>
              </PrivateRoute>
              {/* <Route path="/hotel/:locationId">
                <Hotels></Hotels>
              </Route> */}
              <Route path="/booking/:locationId">
                <Booking></Booking>
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="*">
                <NotFound></NotFound>
              </Route>
            </Switch>
          </Router>
          <Footer></Footer>
        </div>
      </UserContext.Provider>
    );
}

export default App;
