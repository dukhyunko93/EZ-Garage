import React from 'react';
import { Link } from 'react-router-dom';
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

export default function ListingCard(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const cancelHandler = () => {
    props.cancelListing(props.listingObj.listing.id)
  }

  const infoHandler = () => {
    let ls = require('local-storage')
    ls.set('listingObjInfo', props.listingObj)
  }


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const renderVehicleTypes = () => {
    const sedanImage = <img src="https://img.icons8.com/fluent/48/000000/sedan.png" style={{paddingLeft:10, paddingRight:10}} alt="sedan" />
    const minivanImage = <img src="https://img.icons8.com/office/48/000000/suv.png" style={{paddingLeft:10, paddingRight:10}} alt="minivan" />
    const truckImage = <img src="https://img.icons8.com/cotton/60/000000/pickup.png" style={{paddingLeft:10, paddingRight:10}} alt="truck" />
    let vehicleArray = props.listingObj.listing.vehicle_types.split(',')
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
        <td>{props.listingObj.listing.title}</td>
        <td>{props.listingObj.listing.address}</td>
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
                <Card className={classes.root} >
                    <CardMedia
                    className={classes.media}
                    image={`${props.listingObj.listing.featured_image}`}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {`${props.listingObj.listing.title}`}
                    </Typography>
                    <Typography gutterBottom>
                        {`${props.listingObj.listing.address}`}
                    </Typography>
                    <Typography gutterBottom>
                        Check In:{`${props.listingObj.listing.checkin}`} | Check Out: {`${props.listingObj.listing.checkout}`}
                    </Typography>
                    <Typography gutterBottom>
                        ${`${props.listingObj.listing.price}`}/day
                    </Typography>
                    <Typography>
                      Garage can fit:
                    </Typography>
                    <Typography>
                      {renderVehicleTypes()}
                    </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" >
                            <Link style={{color: '#3f51b5', textDecoration: 'none'}} to={{
                                pathname: '/listingform',
                                listingObj: props.listingObj.listing,
                                edit: true
                                }}
                            >Edit
                            </Link>
                        </Button>
                        <Button size="small" color="primary" onClick={cancelHandler}>
                          Delete
                        </Button>
                        <Button size="small" color="primary" onClick={infoHandler}>
                          <Link style={{color: '#3f51b5', textDecoration: 'none'}} to='/listinginfo'
                          >Info
                          </Link>
                        </Button>
                    </CardActions>
                </Card>
                </Typography>
            </Popover>
        </td>
    </tr>
  );
}