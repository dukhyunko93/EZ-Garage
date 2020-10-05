import React, { Component } from 'react'
import { connect } from 'react-redux';
import Cookies from 'js-cookie';  
import { Redirect } from 'react-router';
import { Modal } from 'react-bootstrap/'
import Checkout from '../component/CheckOut/Checkout'

class ConfirmPage extends Component {
  state = {
    redirect: false
  }
  
  makeReservation = () => {
    let ls = require('local-storage')
    if (this.props.user.length > 0){    
      if (this.props.user[0].id !== this.props.selectedListing.listing.owner_id){
        let reservation = {
          listing_id: this.props.selectedListing.listing.id,
          renter_id: this.props.user[0].id,
          reserved_date: this.props.selectedDate,
          fee: this.props.selectedListing.listing.price
        }
        this.postReservation(reservation)
        .then(r => {
          if (r.ok){
            this.setState({redirect: 'profile'}, () => ls.clear())
          }
        })
      } else {
        window.alert('Cannot rent your own property')
      }
    } else {
      this.props.toggleModal()
      this.setState({redirect: 'login'})
    }
  }

  postReservation = reservation => {
    let options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('jwt')}`
      },
      body: JSON.stringify({reservation: reservation})
    }

    return fetch('http://localhost:3001/reservations', options)
  }

  render() {
    const { redirect } = this.state;
    if (redirect === 'profile') {
      return <Redirect to='/profile' />;
    } else if (redirect === 'login'){
      return <Redirect to='/login' />;
    }

    return (
      <>
        <Modal show={this.props.show} >
          <Checkout selectedDate={this.props.selectedDate} listing={this.props.selectedListing?.listing} toggleModal={this.props.toggleModal} makeReservation={this.makeReservation} />
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(ConfirmPage);

