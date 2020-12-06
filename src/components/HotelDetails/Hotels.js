import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import locations from '../FakeData/FakeData';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, Paper, Typography } from '@material-ui/core';
import HotelDetails from './HotelDetails';
// import Map from '../Map/Map';
import './Hotels.css'; 

const useStyles = makeStyles((theme) => ({
    paper: {
        boxShadow: 'none',
    },
    hotelLists: {
        marginTop: '20px',
        boxShadow: 'none',
    },
}));

const Hotels = () => {
    const {locationId} = useParams();
    const { bookingInformation } = useContext(UserContext);
    const [hotel, setHotel] = useState([]);
    
    useEffect(() => {
        const locationDetails = locations.find(location => location.id.toString() === locationId);
        setHotel(previousState => ([...previousState, ...locationDetails.hotels]))
    }, [locationId]); 

    console.log(hotel); 

    const classes = useStyles();
    return (
        <div className="hotelListHeader">
            <Divider />
            <Grid container spacing={5} style={{marginTop: '20px'}}>
                <Grid item xs={12} sm={7}>
                    <Paper className={classes.paper}>
                        <Typography variant="body1" gutterBottom className="headerText">
                            252 stays 
                            {" " + new Date(bookingInformation.startDate).toLocaleString('default', { month: 'short' }) }
                            {" " + new Date(bookingInformation.startDate).getDate() + " -"}
                            {" " + new Date(bookingInformation.endDate).toLocaleString('default', { month: 'short' }) }
                            {" " + new Date(bookingInformation.endDate).getDate() + " "}
                            3 guests
                        </Typography>
                        <Typography variant="h4" gutterBottom className="destinationName">
                            Stay in {bookingInformation.destination}
                        </Typography>
                    </Paper>
                    <Paper className={classes.hotelLists}>
                        {
                            hotel.map(hotels=> <HotelDetails hotels={hotels}></HotelDetails>)
                        }
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Paper className={classes.paper}>
                        {/* <Map details={bookingInformation}></Map> */}
                    </Paper>
                </Grid>
            </Grid>
        </div>

    );
};

export default Hotels;