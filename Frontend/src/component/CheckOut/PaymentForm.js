
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const buttonStyle = {
  marginTop: 10,
  marginRight: 10,
}

  
export default class PaymentForm extends Component {

  state = {
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: ""
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  submitHandler = () => {
    console.log(this.state)
    let ls = require('local-storage')
    ls.set('cardInput', this.state)
    this.props.handleNext()
  }

  render(){
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField 
            required 
            id="cardName"
            name="cardName"
            label="Name on card" 
            value={this.state.cardName}
            onChange={this.changeHandler}
            fullWidth 
            autoComplete="cc-name" 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              name="cardNumber"
              label="Card number"
              value={this.state.cardNumber}
              onChange={this.changeHandler}
              fullWidth
              autoComplete="cc-number"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField 
              required 
              id="expDate" 
              name="expDate"
              label="Exp date" 
              value={this.state.expDate}
              onChange={this.changeHandler}
              fullWidth 
              autoComplete="cc-exp" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              name="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              value={this.state.cvv}
              onChange={this.changeHandler}
              fullWidth
              autoComplete="cc-csc"
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
              onClick={this.props.handleBack}
            >
              Back
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
  }
}