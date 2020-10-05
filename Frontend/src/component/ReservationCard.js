import React from 'react';
import { makeStyles, Popover, CardActions, Card, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

const buttonStyle = {
  background: 'orange',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px',
  color: 'black',
};

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },  
  root: {
    width: 300,
  },
  media: {
    height: 140,
  },
}));

export default function SimplePopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
    
  function handleCancellation() {
      props.cancelReservation(props.reservationObj.reservation.id)
  }

  const renderVehicleTypes = () => {
    const sedanImage = <img src="https://img.icons8.com/fluent/48/000000/sedan.png" style={{paddingLeft:10, paddingRight:10}} alt="sedan" />
    const minivanImage = <img src="https://img.icons8.com/office/48/000000/suv.png" style={{paddingLeft:10, paddingRight:10}} alt="minivan" />
    const truckImage = <img src="https://img.icons8.com/cotton/60/000000/pickup.png" style={{paddingLeft:10, paddingRight:10}} alt="truck" />
    let vehicleArray = props.reservationObj.listing.vehicle_types.split(',')
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

  return (
    <tr>
        <th scope="row"></th>
        <td>{props.reservationObj.listing.title}</td>
        <td>{props.reservationObj.listing.address}</td>
        <td>
            <Button style={buttonStyle} onClick={handleClick}>
                Detail
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
            >
                <Typography className={classes.typography}>
                <Card className={classes.root}>
                    <CardMedia
                    className={classes.media}
                    image={`${props.reservationObj.listing.featured_image}`}
                    />
                    <CardContent>
                      <Typography gutterBottom>
                          {`${props.reservationObj.listing.title}`}
                      </Typography>
                      <Typography gutterBottom>
                          {`${props.reservationObj.listing.address}`}
                      </Typography>
                      <Typography gutterBottom>
                          Check In: {`${props.reservationObj.listing.checkin}`} | Check Out: {`${props.reservationObj.listing.checkout}`}
                      </Typography>
                      <Typography gutterBottom>
                          ${`${props.reservationObj.listing.price}`}/day
                      </Typography>
                      <Typography>
                        Garage can fit:
                      </Typography>
                      <Typography>
                        {renderVehicleTypes()}
                      </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={handleCancellation}>
                            Cancel Rental
                        </Button>
                    </CardActions>
                </Card>
                </Typography>
            </Popover>
        </td>
    </tr>
  );
}