import React, { Component } from 'react';
import { connect } from 'react-redux';
import AutoComplete from '../component/AutoComplete'
import { Redirect } from 'react-router'
import { Button } from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import './Home.css'

const buttonStyle = {
  background: 'orange',
  color: 'black',
};

class Home extends Component {

  state ={
    addressValidated: false,
    redirect: false,
    warningStyle: {
      "display": "none",
    }
  }

  validateAddress = () => {
    this.setState({
      addressValidated: true
    })
  }

  clickHandler = () => {
    this.state.addressValidated ?
    this.setState({
      redirect: true
    })
    :
    this.setState({
      warningStyle: {
        "color": "red",
        "display": "block",
    }})
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/index'/>;
    }

    return (
      <div className="Home">
        <div className="home-background" />
        <div className="home-search">
          <div className="search-container">
            <h3>Find Garage Near</h3>
            <AutoComplete validateAddress={this.validateAddress} home />
            <p style={this.state.warningStyle}>Please enter an address.</p>
            <Button style={buttonStyle} onClick={this.clickHandler} >Search</Button>
          </div>
        </div>
        <div className="product-values">
          <div className="value">
            <EmojiObjectsIcon style={{marginBottom: 5}}/>
            <h5>NEW EXPERIENCE</h5>
            <p>New way to communicate with people, be creative! Turn your garage into a gym, art studio, etc.</p>
          </div>
          <div className="value">
            <AutorenewIcon style={{marginBottom: 5}}/>
            <h5>STOP WASTING YOU GARAGE</h5>
            <p>Don't be that person that keeps their garage as a dumpster, this is an opportunity to turn junk into cash</p>
          </div>
          <div className="value">
            <AccountBalanceWalletIcon style={{marginBottom: 5}}/>
            <h5>MAKE AND SAVE MONEY</h5>
            <p>Make extra cash by renting out your garage and save money on parking or gym memberships by renting a garage</p>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Home);