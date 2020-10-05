import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  }
}));

export default function Checkout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = ['Shipping address', 'Payment details', 'Review your order'];
  
  function getStepContent(step, props) {
    switch (step) {
      case 0:
        return <AddressForm toggleModal={props.toggleModal} handleNext={handleNext} />;
      case 1:
        return <PaymentForm toggleModal={props.toggleModal} handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return <Review listing={props.listing} selectedDate={props.selectedDate} toggleModal={props.toggleModal} handleNext={handleNext} handleBack={handleBack} makeReservation={props.makeReservation}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <main className={classes.layout}>
        <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
            Checkout
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
            <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>
            ))}
        </Stepper>
        <React.Fragment>
            {activeStep === steps.length ? (
            <React.Fragment>
                <Typography variant="h5" gutterBottom>
                Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order confirmation, and will
                send you an update when your order has shipped.
                </Typography>
            </React.Fragment>
            ) : (
            <React.Fragment>
                {getStepContent(activeStep, props)}
            </React.Fragment>
            )}
        </React.Fragment>
        </Paper>
    </main>
  );
}