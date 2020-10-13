import React, { Component } from "react";
import { connect } from "react-redux";
import ListingCard from "../component/ListingCard"
import ReservationCard from "../component/ReservationCard"
import Cookies from "js-cookie";  
import { saveUser } from "../actions/user"

class Profile extends Component {
    
    state = {
        listings: [],
        reservations:[],
    }

    componentDidMount(){
        if (this.props.user[0]?.id === undefined){
            this.props.getCurrentUser()
            .then(r => r.json())
            .then(r => {
            this.props.saveUser(r.user) 
            this.getMyListing()
            this.getMyReservation()
            })
        } else {
            this.getMyListing()
            this.getMyReservation()
        }
    }
    
    getMyListing = () => {
        fetch(`https://ez-garage-api.herokuapp.com/listings/${this.props.user[0].id}`)
        .then(r => r.json())
        .then(r => {
            this.setState({ listings: r })
        })
    }
    
    getMyReservation = () => {
        fetch(`https://ez-garage-api.herokuapp.com/reservations/${this.props.user[0].id}`)
        .then(r => r.json())
        .then(r => {
            this.setState({ reservations: r })
        })
    }

    deleteMyListing = (listingID) => {
        let options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt")}`
            }
        }
      
        return fetch(`https://ez-garage-api.herokuapp.com/listings/${listingID}`, options)
    }

    cancelListing = (listingObj) => {
        this.deleteMyListing(listingObj)
        .then(r => r.json())
        .then(r => {
            let filterListing = this.state.listings.filter(listingObj => listingObj.listing.id !== r.listing.id)
            this.setState({listings: filterListing})
        })
    }

    deleteMyReservation = (reservationId) => {
        let options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt")}`
            }
        }
      
        return fetch(`https://ez-garage-api.herokuapp.com/reservations/${reservationId}`, options)
    }

    cancelReservation = (reservationObj) => {
        this.deleteMyReservation(reservationObj)
        .then(r => r.json())
        .then(r => {
            let filterReservation = this.state.reservations.filter(reservationObj => reservationObj.reservation.id !== r.reservation.id)
            this.setState({reservations: filterReservation})
        })
    }

    renderListingCard = () => {
        if (this.state.listings.length > 0){
        return this.state.listings.map(listingObj => <ListingCard key={listingObj.listing.id} listingObj={listingObj} cancelListing={this.cancelListing} />)
        }
    }

    renderReservationCard = () => {
        if (this.state.reservations.length > 0){
        return this.state.reservations.map(reservationObj => <ReservationCard key={reservationObj.reservation.id} reservationObj={reservationObj} cancelReservation={this.cancelReservation} />)
        }
    }

    render(){
        return (
            <div className="profile">
                <div className="my-listings">
                    <h4>My Listings</h4>
                    <table className="table table-hover table-light">
                        <thead>
                            <tr>
                            <th scope="col"></th>
                            <th scope="col">Title</th>
                            <th scope="col">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderListingCard()}
                        </tbody>
                    </table>
                </div>
                <div className="my-rentals">
                    <h4>Upcoming Rentals</h4>
                    <table className="table table-hover table-light">
                        <thead>
                            <tr>
                            <th scope="col"></th>
                            <th scope="col">Title</th>
                            <th scope="col">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.renderReservationCard()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return state 
}

const mapDispatchToProps = dispatch => {
return {
    saveUser: (user) => {
    dispatch(saveUser(user))
    }
}
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Profile);