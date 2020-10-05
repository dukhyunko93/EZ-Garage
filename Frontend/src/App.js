import React, { Component } from 'react';
import Cookies from 'js-cookie';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './container/Home';
import ListingIndex from './container/ListingIndex';
import ListingShow from './container/ListingShow';
import Profile from './container/Profile';
import ListingForm from './component/ListingForm';
import ListingInfo from './component/ListingInfo'
import NavBar from './component/NavBar/NavBar';
import Login from './component/Login';
import Signup from './component/Signup';
import { saveUser } from './actions/user';
import { saveEarning } from './actions/earnings';
import { connect } from 'react-redux';

class App extends Component {
  state ={
    loggedIn: false
  }

  componentDidMount() {
    if(Cookies.get('jwt')){
      this.getCurrentUser()
      .then(r => r.json())
      .then(r => {
        this.props.saveUser(r.user)
        this.props.saveEarning(r.total_earnings)
      })
    }
  }
  
  getCurrentUser() {
      let token = Cookies.get('jwt')
      const config = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      return fetch('http://localhost:3001/profile', config)
  }

  logOut = () => {
    Cookies.remove('jwt')
    this.props.saveUser([]) 
  }

  render() {
    return (
      <Router>
        <div className='NavBar' >
          <NavBar logOut={this.logOut} loggedIn={this.state.loggedIn} />
        </div>
        
        <div className='Pages'>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/index" render={() => <ListingIndex getCurrentUser={this.getCurrentUser} />} />
          <Route exact path="/show" render={() => <ListingShow />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/signup" render={() => <Signup />} />
          <Route exact path="/listingform" render={() => <ListingForm />} />
          <Route exact path="/profile" render={() => <Profile getCurrentUser={this.getCurrentUser} />} />
          <Route exact path="/listinginfo" render={() => <ListingInfo />} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return state 
}

const mapDispatchToProps = dispatch => {
  return {
    saveUser: (user) => {
      dispatch(saveUser(user))
    },
    saveEarning: (total_earning) => {
      dispatch(saveEarning(total_earning))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
