import React, { Component } from "react";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { Button, FormGroup, FormControl, InputLabel, Input, FormControlLabel, Checkbox } from "@material-ui/core";
import AutoComplete from "../component/AutoComplete"
import { Redirect, withRouter } from "react-router";
import "./ListingForm.css";

class ListingForm extends Component{
    state = {
        title: this.props.location.listingObj ? this.props.location.listingObj.title : "",
        address: this.props.location.listingObj ? this.props.location.listingObj.address : "",
        checkin: this.props.location.listingObj ? this.props.location.listingObj.checkin : "",
        checkout:this.props.location.listingObj ? this.props.location.listingObj.checkout : "",
        price: this.props.location.listingObj ? this.props.location.listingObj.price : "",
        featured_image: this.props.location.listingObj ? this.props.location.listingObj.featured_image : null,
        sedan: false,
        minivan: false,
        truck: false,
        vehicleType: [],
        redirect: false,
    }

    validateForm = () => {
        return this.state.title.length > 0 && this.state.address.length > 0 && this.state.price.length > 0 && this.state.featured_image !== null
    }

    onChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    handleCheckBox = event => {
        this.setState({ 
            [event.target.name]: event.target.checked,
            vehicleType: [...this.state.vehicleType, event.target.name]
        });
    }

    addressHandler = event => {
        this.setState({
            address: event
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.props.location.edit){
            this.patchListing()
        } else {
            this.validateForm() ?
            this.postListing()
            :
            console.log("WARNING MESSAGE")
        }
    }

    onImageChange = event => { 
        this.setState({ featured_image: event.target.files[0] });
    }

    postListing = () => {
        const formData = new FormData();
        formData.append("title", this.state.title);
        formData.append("address", this.props.address[0].address);
        formData.append("latitude", this.props.address[0].lat);
        formData.append("longitude", this.props.address[0].lng);
        formData.append("price", this.state.price);
        formData.append("checkin", this.state.checkin);
        formData.append("checkout", this.state.checkout);
        formData.append("vehicle_types", this.state.vehicleType);
        formData.append("featured_image", this.state.featured_image);
        formData.append("owner_id", this.props.user[0]?.id);
        
        let options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt")}`
            },
            body: formData
        }

        fetch("https://ez-garage-api.herokuapp.com/listings", options)
        .then(r => {
            console.log(r)
            if (r.ok){
                this.setState({ redirect: true })
            }
        })
    }

    patchListing = () => {
        const formData = new FormData();
        formData.append("title", this.state.title);
        formData.append("price", this.state.price);
        formData.append("checkin", this.state.checkin);
        formData.append("checkout", this.state.checkout);
        formData.append("vehicle_types", this.state.vehicleType);
        if (this.props.address.length > 0) {
            formData.append("address", this.props.address[0]?.address);
            formData.append("latitude", this.props.address[0]?.lat);
            formData.append("longitude", this.props.address[0]?.lng);
        }
        if ( typeof(this.state.featured_image) === "object"){formData.append("featured_image", this.state.featured_image)}
        
        let options = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt")}`
            },
            body: formData 
        }

        fetch(`https://ez-garage-api.herokuapp.com/listings/${this.props.location.listingObj.id}`, options)
        .then(r => {
            if (r.ok){
                this.setState({ redirect: true })
            }
        })
    }

    render(){
        const { redirect } = this.state;

        if (redirect) {
          return <Redirect to="/profile"/>;
        }
        return (
            <div className="ListingForm">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup bssize="large">
                        <FormControl>
                            <InputLabel >Parking Lot Title</InputLabel>
                            <Input                             
                            name="title"
                            type="title"
                            value={this.state.title}
                            onChange={this.onChangeHandler}
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel >Rental Fee</InputLabel>
                            <Input                             
                                name="price"
                                type="number" 
                                min="0"
                                value={this.state.price}
                                onChange={this.onChangeHandler}
                            />
                        </FormControl>
                        <br></br>
                        <FormControl>
                            <InputLabel shrink >Check In</InputLabel>
                            <Input                             
                                name="checkin"
                                type="time"
                                value={this.state.checkin}
                                onChange={this.onChangeHandler}
                            />
                        </FormControl>
                        <br></br>
                        <FormControl>
                            <InputLabel shrink >Check Out</InputLabel>
                            <Input                             
                                name="checkout"
                                type="time"
                                value={this.state.checkout}
                                onChange={this.onChangeHandler}
                            />
                        </FormControl>
                        <br></br>
                        <FormControl>
                            <InputLabel shrink >Parking Lot Image</InputLabel>
                            <Input                             
                                name="file"
                                type="file"
                                onChange={this.onImageChange}
                            />
                        </FormControl>
                        <br></br>
                        <InputLabel component="legend">Check the vehicle types that your garage can fit.</InputLabel>

                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox checked={this.state.sedan} onChange={this.handleCheckBox} name="sedan" />}
                                label={<img src="https://img.icons8.com/fluent/48/000000/sedan.png" alt="sedan" />}
                            />
                            <FormControlLabel
                                control={<Checkbox checked={this.state.minivan} onChange={this.handleCheckBox} name="minivan" />}
                                label={<img src="https://img.icons8.com/office/48/000000/suv.png" alt="minivan" />}
                            />
                            <FormControlLabel
                                control={<Checkbox checked={this.state.truck} onChange={this.handleCheckBox} name="truck" />}
                                label={<img src="https://img.icons8.com/cotton/60/000000/pickup.png" alt="truck" />}
                            />
                        </FormGroup>
                        <br></br>
                        <FormControl>
                            <AutoComplete onChangeHandler={this.addressHandler} listingForm listingObj={this.props.location.listingObj} edit={this.props.location.edit}/>
                        </FormControl>
                    </FormGroup>
                    <Button bssize="large" type="submit" >
                        {this.props.location.edit ? "Edit" : "Create Listing"}
                    </Button>
                </form>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return state
  }
  
export default withRouter(connect(mapStateToProps)(ListingForm));