import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

const HotelDetails = (props) => {
    const {id, hotelTitle, image, capacity, bedroom, bed, bath, price, totalPrice, feature1, feature2, ratting } = props.hotels;

    return (
        <Grid container spacing={5} style={{marginBottom: '10px'}}>
            <Grid item xs={12} sm={5}>
                <img src={image} alt={hotelTitle} className="hotelImg" />
            </Grid>
            <Grid item xs={12} sm={7}>
                <Paper style={{boxShadow: 'none'}}>
                    <Typography variant="h5" gutterBottom className="hotelTitle">
                        {hotelTitle}
                    </Typography>
                    <Typography variant="body1" gutterBottom className="hotelfeature">
                        {capacity} guests {bedroom} bedrooms {bed} beds {bath} baths
                    </Typography>
                    <Typography variant="body1" gutterBottom className="hotelfeature">
                        {feature1}
                    </Typography>
                    <Typography variant="body1" gutterBottom className="hotelfeature">
                        {feature2}
                    </Typography>
                </Paper>
                <div className="hotelCost">
                    <img src="https://i.ibb.co/x5b3Y6f/star-1.png" alt="5" style={{width: '20px' }} />  
                    <Typography variant="body1" className="hotelRating" >
                        {ratting}
                    </Typography>  
                    <Typography variant="body1" className="hotelPrice" >
                        ${price}/
                    </Typography>
                    <Typography variant="body1" className="hotelPriceText" >
                        night
                    </Typography>
                    <Typography variant="body2" className="hotelTotalPrice" >
                        ${totalPrice} Total
                    </Typography>
                </div>
            </Grid>
        </Grid>
    );
};

export default HotelDetails;