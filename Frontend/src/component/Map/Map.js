import React, { Component } from "react";
import { connect } from 'react-redux';
import { GoogleMap, Marker } from "@react-google-maps/api";
import mapStyles from './MapStyle'
import { withRouter } from 'react-router';

const mapContainerStyle = {
    width: "100%",
    height: "100%",
}
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
}

class Map extends Component{

    state ={
        center: null,
        zoom: 11
    }
    
    componentDidMount(){
        this.setState({
            center:{
                lat: this.props.location.center ? this.props.location.center.lat : 40.7128,
                lng: this.props.location.center ? this.props.location.center.lng : -74.0060,
            },
        })
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps){
            if(this.props.address !== prevProps.address){
                this.setState({
                    center:{
                        lat: this.props.address[0].lat,
                        lng: this.props.address[0].lng,
                    },
                    zoom: 13,
                })
            } else if(this.props.location !== prevProps.location) {
                this.setState({
                    center:{
                        lat: this.props.location.center.lat,
                        lng: this.props.location.center.lng,
                    },
                    zoom: 11,
                })
            }
        }
    }

    clickHandler = listing => {
        this.setState({
            center:{
                lat: parseFloat(listing.listing.latitude),
                lng: parseFloat(listing.listing.longitude),
            },
            zoom: 15
        }, () => {
            this.props.getSelectedListing(listing)
        })
    }

    renderMarker = () => {
        return this.props.listings.map(listingObj => 
            <Marker
                key={listingObj.listing.id}
                position={{lat: parseFloat(listingObj.listing.latitude), lng: parseFloat(listingObj.listing.longitude)}}
                onClick={() => this.clickHandler(listingObj)}
            />
        )
    }

    render(){
        return(
            <GoogleMap 
            mapContainerStyle={mapContainerStyle} 
            zoom={this.state.zoom} center={this.state.center} 
            options={options} 
            >
            {this.renderMarker()}
            </GoogleMap>
        )
    }
}

const mapStateToProps = state => {
    return state
}

export default withRouter(connect(mapStateToProps)(Map));