import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import locations from '../FakeData/FakeData';
import { Grid, Button, Typography, FormControl, InputLabel, InputBase, fade, withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import DateRangeIcon from '@material-ui/icons/DateRange';
import {UserContext} from '../../App';
import './Booking.css';

const useStyles = makeStyles((theme) => ({
    bookingContent: {
        padding: '30px 60px',
        alignContent: 'center',
    },
    bookingGridContent: {
        padding: '30px',
    },
    locationName: {
        fontFamily: 'Bebas Neue',
        fontWeight: 'normal',
        fontSize: '40px',
        color: '#FFFFFF',
        textAlign: 'left',
        textTransform: 'uppercase',
        marginBottom: '20px',
    },
    locationDescription: {
        fontFamily: 'Montserrat',
        fontWeight: 'normal',
        fontSize: '16px',
        color: '#FFFFFF',
        textAlign: 'left',
        lineHeight: '24px',
    },
    form: {
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '25px', 
        width: '75%',
        margin: 'auto',
    },
    formControl: {
        marginBottom: '15px', 
        width: '100%',
    },
    inputLabel: {
        color: '#818181',
        fontSize: '18px',
    },
    dateInput:{
        padding: '5px 2px',
    },
    inputDateLabel: {
        color: '#818181',
        fontSize: '16px',
        fontWeight: '400',
        marginBottom: '5px',
    },
    btn: {
        padding: '10px',
        background: '#F9A51A',
        borderRadius: '5px',
        color: 'black',
        marginTop: '10px',
        cursor: 'pointer',
        '&:hover': {
          background: '#F9A51A',
          borderRadius: '5px',
          borderColor: 'white',
          color: 'white',
        },
      },
}));

const Booking = () => {
    const history = useHistory(); 
    const [booking, setBooking] = useState({
      location: {},
      origin: '',
      destination: ''
    });

    const {locationId} = useParams(); 
    const {bookingInformation, setBookingInformation} = useContext(UserContext); 
    // const bookingLocation = locations.find( ({id}) => id == locationId );
    
    useEffect(() => {
        const bookingLocation = locations.find(location => location.id.toString() === locationId);
        const {title, description} = bookingLocation;
        setBooking(previousState => ({ ...previousState, location: bookingLocation, destination: bookingLocation.title }))
    }, [locationId]); 
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(Date.now() + 4 * 24 * 60 * 60 * 1000));
    
    const onChangeHandler = e => {
        setBooking(previousState => ({ ...previousState, origin: e.target.value })); 
        e.persist()
    }

    const submitHandler = e => {
        setBookingInformation({ ...bookingInformation, ...booking, startDate, endDate });
        history.push(`/hotel/${locationId}`)
        e.preventDefault();
    }

    const classes = useStyles();
    const BootstrapInput = withStyles((theme) => ({
        root: {
          'label + &': {
            marginTop: theme.spacing(3),
            width: '100%',
          },
        },
        input: {
          borderRadius: 5,
          position: 'relative',
          backgroundColor: '#F2F2F2',
          border: '1px solid #ced4da',
          fontSize: 16,
          fontWeight: 'bold',
          padding: '10px 12px',
          transition: theme.transitions.create(['border-color', 'box-shadow']),
          // Use the system font instead of the default Roboto font.
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
          '&:focus': {
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
          },
        },
      }))(InputBase);
    return (
        <Grid container className={classes.bookingContent}>
            <Grid item xs={6} className={classes.bookingGridContent}>
                <Typography variant="h5" component="h5" className={classes.locationName}>
                    {booking.destination}
                </Typography>
                <Typography variant="body2" className={classes.locationDescription}>
                    {booking.location.description}
                </Typography>
            </Grid>
            <Grid item xs={6} className={classes.bookingGridContent}>
                <form className={classes.form} noValidate  onSubmit={submitHandler}>
                    <Grid container>
                        <Grid item xs={12} >
                            <FormControl className={classes.formControl} >
                                <InputLabel shrink htmlFor="originLocation" className={classes.inputLabel}>
                                    Origin
                                </InputLabel>
                                <BootstrapInput onBlur={onChangeHandler}  id="originLocation" className={classes.input}  />
                            </FormControl>
                        </Grid>
                        < br />
                        <Grid item xs={12} >
                            <FormControl className={classes.formControl} >
                                <InputLabel className={classes.inputLabel} shrink htmlFor="destination">
                                    Destination
                                </InputLabel>
                                <BootstrapInput value={booking.destination}   id="destination" className={classes.input} />
                            </FormControl>
                        </Grid>
                        < br />
                        <Grid item xs={6} >
                            <InputLabel className={classes.inputDateLabel}>
                                From
                            </InputLabel>
                            <FormControl className={classes.formControl} style={{width: '90%'}}>
                                <DatePicker
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    dateFormat="dd-MM-yyyy"
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    className="datePickerClass"
                                >
                                </DatePicker> 
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} >
                            <InputLabel className={classes.inputDateLabel}>
                                To
                            </InputLabel>
                            <FormControl className={classes.formControl} >
                                <DatePicker
                                    selected={endDate}
                                    onChange={date => setEndDate(date)}
                                    dateFormat="dd-MM-yyyy"
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    className="datePickerClass"
                                />
                            </FormControl>
                        </Grid>
                        < br />
                        <Grid item xs={12} >
                            <FormControl className={classes.formControl} >
                                <Button variant="contained" className={classes.btn} type="submit" >Start Booking</Button>
                            </FormControl>
                        </Grid>
                        
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};

export default Booking;