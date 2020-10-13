import React, { Component } from "react";
import { saveUser } from "../actions/user";
import { connect } from "react-redux";
import Cookies from "js-cookie";  
import Map from "../component/Map/Map";
import AutoComplete from "../component/AutoComplete";
import ListingShow from "./ListingShow"
import ConfirmPage from "./ConfirmPage"

class ListingIndex extends Component {

  state = {
    listings: [],
    selectedListing: null,
    card: false,
    showModal: false,
    selectedDate: ""
  }

  componentDidMount(){
    if(Cookies.get("jwt")){
        this.props.getCurrentUser()
        .then(r => r.json())
        .then(r => {
        this.props.saveUser(r.user) 
        this.getAllListing()
        })
    } else {
        this.getAllListing()
    }
  }

  getAllListing = () => {
      fetch("https://ez-garage-api.herokuapp.com/listings")
      .then(r => r.json())
      .then(r => {
          this.setState({ listings: r })
      })
  }

  getSelectedListing = listingObj => {
    this.setState({ selectedListing: listingObj, card: true } )
  }

  getDate = date => {
    this.setState({selectedDate: date})
  }

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal})
  }

  render(){
    return (
      <>
        <ConfirmPage toggleModal={this.toggleModal} show={this.state.showModal} selectedListing={this.state.selectedListing} selectedDate={this.state.selectedDate} />
        <div className="map-index">
          <Map listings={this.state.listings} getSelectedListing={this.getSelectedListing} />
        </div>
        <div className="show-index">
          <AutoComplete address={this.props.address[0]?.address} index/>
          {this.state.selectedListing !== null ? <ListingShow selectedListing={this.state.selectedListing} toggleModal={this.toggleModal} getDate={this.getDate} /> : null}
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListingIndex);