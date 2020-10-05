import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
const buttonStyle = {
  marginTop: 10,
  marginRight: 10,
}

export default class Review extends Component {
  state = {
    address: null,
    payments: null,
  }

  componentDidMount() {
    let ls = require('local-storage')
    let addressInput = ls.get('addressInput')
    let cardInput = ls.get('cardInput')

    this.setState({
      firstName: `${addressInput.firstName}`,
      lastName: `${addressInput.lastName}`,
      address: [`${addressInput?.address1}`, `${addressInput?.address2}`, `${addressInput?.city}`, `${addressInput?.state}`, `${addressInput?.zipCode}`, `${addressInput?.country}`],
      payments: [
        { name: 'Card holder', detail: `${cardInput?.cardName}` },
        { name: 'Card number', detail: `xxxx-xxxx-xxxx-${cardInput?.cardNumber.slice(-4)}` },
        { name: 'Expiry date', detail: `${cardInput?.expDate}` },
      ]
    })
  }

  render(){
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          <ListItem style={{paddingTop: 1, paddingBottom: 1}} >
            <ListItemText primary={this.props.listing.title} secondary={this.props.listing.address} />
            <Typography variant="body2">${this.props.listing.price}</Typography>
          </ListItem>
          <ListItem style={{paddingTop: 1, paddingBottom: 1}} >
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" style={{fontWeight: 700}}>
              ${this.props.listing.price}
            </Typography>
          </ListItem>
        </List>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom style={{marginTop: 2}}>
              Renter
            </Typography>
            <Typography gutterBottom>{`${this.state.firstName}`} {`${this.state.lastName}`}</Typography>
            <Typography gutterBottom>{this.state.address?.join(', ')}</Typography>
          </Grid>
          <Grid item container direction="column" xs={12} sm={6}>
            <Typography variant="h6" gutterBottom style={{marginTop: 2}}>
              Payment details
            </Typography>
            <Grid container>
              {this.state.payments?.map((payment) => (
                <React.Fragment key={payment.name}>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.detail}</Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
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
                onClick={this.props.makeReservation}
              >
                Rent Garage
              </Button>
            </div>
      </React.Fragment>
    );
  };
};