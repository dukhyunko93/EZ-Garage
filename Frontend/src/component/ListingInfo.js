import React, { Component } from 'react';
import Cookies from 'js-cookie';  
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Card, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import './ListingInfo.css'

class ListingInfo extends Component{
    state = {
        listing: null,
        reservations: null,
    }

    componentDidMount() {
        let ls = require('local-storage')
        let listingObj = ls.get('listingObjInfo')
        this.setState({
            listing: listingObj.listing,
            reservations: listingObj.reservation,
        }, () => console.log(this.state))
    }

    deleteMyListing = () => {
        let options = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${Cookies.get('jwt')}`
            }
        }
      
        return fetch(`https://ez-garage-api.herokuapp.com//listings/${this.state.listing.id}`, options)
    }

    renderVehicleTypes = () => {
        const sedanImage = <img src="https://img.icons8.com/fluent/48/000000/sedan.png" style={{paddingLeft:10, paddingRight:10}} alt="sedan" />
        const minivanImage = <img src="https://img.icons8.com/office/48/000000/suv.png" style={{paddingLeft:10, paddingRight:10}} alt="minivan" />
        const truckImage = <img src="https://img.icons8.com/cotton/60/000000/pickup.png" style={{paddingLeft:10, paddingRight:10}} alt="truck" />
        let vehicleArray = this.state.listing?.vehicle_types.split(',')
        return vehicleArray?.map(vehicle => {
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
            <div className='ListingInfo'>
                <div className='listing'>
                    <Card>
                        <Typography gutterBottom variant="h5" >
                            {`${this.state.listing?.title}`}
                            <Button size="small" color="primary" >
                                <Link style={{color: '#3f51b5', textDecoration: 'none'}} to={{
                                    pathname: '/listingform',
                                    listingObj: this.state.listing,
                                    edit: true
                                    }}
                                >Edit
                                </Link>
                            </Button>
                            <Button size="small" color="primary" onClick={this.deleteMyListing}>
                                Delete
                            </Button>
                        </Typography>
                        <CardMedia
                        style={{
                            height: 350,
                        }}
                        image={`${this.state.listing?.featured_image}`}
                        />
                        <CardContent>
                            <Typography gutterBottom >
                            {`${this.state.listing?.address}`}
                            </Typography>
                            <Typography gutterBottom >
                            Check In: {`${this.state.listing?.checkin}`} | Check Out: {`${this.state.listing?.checkout}`}
                            </Typography>
                            <Typography gutterBottom>
                            Rental Fee:
                            ${`${this.state.listing?.price}`}/day
                            </Typography>
                            <Typography>
                            Garage can fit:
                            </Typography>
                            <Typography>
                            {this.renderVehicleTypes()}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div className='reservation-list' >
                    <Table size="small">
                    <TableHead>
                        <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell >Sale Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.reservations?.map((reservation) => (
                        <TableRow key={reservation.reservation.id}>
                            <TableCell>{reservation.reservation.reserved_date}</TableCell>
                            <TableCell>{reservation.renter.last_name},{reservation.renter.first_name}</TableCell>
                            <TableCell>{reservation.renter.username}</TableCell>
                            <TableCell>${reservation.reservation.fee}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </div>
            </div>
        );
    };
};

export default ListingInfo