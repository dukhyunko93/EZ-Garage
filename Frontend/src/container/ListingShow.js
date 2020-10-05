import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from '../component/Calendar'
import { Card, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';

class ListingShow extends Component {

    state = {
      dateSelected: true,
    }

    updateDateSelected = () => {
      this.setState({dateSelected: false})
    }
    
    renderVehicleTypes = () => {
      const sedanImage = <img src="https://img.icons8.com/fluent/48/000000/sedan.png" style={{paddingLeft:10, paddingRight:10}} alt="sedan" />
      const minivanImage = <img src="https://img.icons8.com/office/48/000000/suv.png" style={{paddingLeft:10, paddingRight:10}} alt="minivan" />
      const truckImage = <img src="https://img.icons8.com/cotton/60/000000/pickup.png" style={{paddingLeft:10, paddingRight:10}} alt="truck" />
      let vehicleArray = this.props.selectedListing.listing.vehicle_types.split(',')
      return vehicleArray.map(vehicle => {
        if (vehicle === 'sedan'){
          return sedanImage
        } else if (vehicle === 'minivan'){
          return minivanImage
        } else if (vehicle === 'truck'){
          return truckImage
        } else {
          return null
        }
      })
    }

    render(){
      return (
        <>
          <Card>
              <CardMedia
              style={{
                height: 200,
              }}
              image={`${this.props.selectedListing.listing.featured_image}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {`${this.props.selectedListing.listing.title}`}
                </Typography>
                <Typography gutterBottom >
                  {`${this.props.selectedListing.listing.address}`}
                </Typography>
                <Typography gutterBottom >
                  Check In: {`${this.props.selectedListing.listing.checkin}`} | Check Out: {`${this.props.selectedListing.listing.checkout}`}
                </Typography>
                <Typography gutterBottom>
                  Rental Fee:
                  ${`${this.props.selectedListing.listing.price}`}/day
                </Typography>
                <Typography>
                  Garage can fit:
                </Typography>
                <Typography>
                  {this.renderVehicleTypes()}
                </Typography>
              </CardContent>
          </Card>
          <Typography style={{"background": "white", "paddingBottom": "5px"}}>
            <EventIcon style={{marginLeft: 15, marginRight: 15}} />
            <Calendar getDate={this.props.getDate} updateDateSelected={this.updateDateSelected} reservations={this.props.selectedListing.reservation} />
            <Button size="small" color="primary" disabled={this.state.dateSelected} onClick={this.props.toggleModal}>
              Rent
            </Button>
          </Typography>
        </>
      );
    }
};

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(ListingShow);
