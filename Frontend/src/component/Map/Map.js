import React, { Component } from "react";
import { connect } from 'react-redux';
import { GoogleMap, Marker } from "@react-google-maps/api";
import mapStyles from './MapStyle'

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
        center:{
            lat: 40.7128,
            lng: -74.0060,
        },
        zoom: 11
    }
    
    componentDidUpdate(prevProps) {
        if(this.props !== prevProps){
            this.setState({
                center:{
                    lat: this.props.address[0]?.lat !== undefined ? this.props.address[0].lat : 40.7128,
                    lng: this.props.address[0]?.lng !== undefined ? this.props.address[0].lng : -74.0060,
                },
                zoom: this.props.address[0]?.lat !== undefined ? 12 : 11,
            })
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
                label={`$${listingObj.listing.price}`}
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

export default connect(mapStateToProps)(Map);