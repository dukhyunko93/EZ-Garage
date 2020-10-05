import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const buttonStyle = {
  marginTop: 10,
  marginRight: 10,
}

export default class AddressForm extends Component {

  state = {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = () => {
    let ls = require('local-storage')
    ls.set('addressInput', this.state)
    this.props.handleNext()
  }

  render(){
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              value={this.state.firstName}
              onChange={this.changeHandler}
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              value={this.state.lastName}
              onChange={this.changeHandler}
              fullWidth
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              value={this.state.address1}
              onChange={this.changeHandler}
              fullWidth
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              value={this.state.address2}
              onChange={this.changeHandler}
              fullWidth
              autoComplete="shipping address-line2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              value={this.state.city}
              onChange={this.changeHandler}
              fullWidth
              autoComplete="shipping address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
            id="state" 
            name="state" 
            label="State/Province/Region"
            value={this.state.state}
            onChange={this.changeHandler}
            fullWidth 
            autoComplete="shipping address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zipCode"
              label="Zip / Postal code"
              value={this.state.zipCode}
              onChange={this.changeHandler}
              fullWidth
              autoComplete="shipping postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              value={this.state.country}
              onChange={this.changeHandler}
              fullWidth
              autoComplete="shipping country"
            />
          </Grid>
        </Grid>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <Button
            style={buttonStyle}                  
            variant="contained"
            color="primary" 
            onClick={this.props.toggleModal}
          >
              Cancel
          </Button>
          <Button
              style={buttonStyle}
              variant="contained"
              color="primary"
              onClick={this.submitHandler}
          >
            Next
          </Button>
        </div>
      </React.Fragment>
    );
  };
};