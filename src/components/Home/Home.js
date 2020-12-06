import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.css';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import locations from '../FakeData/FakeData'; 
import LocationDetails from './LocationDetails';
import { useHistory } from 'react-router-dom';
import { Grid, Paper, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const useStyles = makeStyles((theme) => ({
    rootHome: {
        flexGrow: 1,
        padding: '30px 80px',
    },
    paperItemDescription: {
        background: 'transparent',
        color: '#efefef',
        boxShadow: 'none',
    },
    bookingButton:{
        display: 'flex',
        margin: '10px auto 20px',
        background: 'rgb(255, 145, 0)',
        '&:hover': {
            color: 'white',
            background: 'rgb(255, 145, 0)',
          },
    },
    paperSlider: {
        background: 'transparent',
        color: '#efefef',
        boxShadow: 'none',
    }
}));

const Home = () => {
    const classes = useStyles();

    const history = useHistory(); 
    const [slideIndex, setSlideIndex] = useState(0);
    const [booking, setBooking] = useState({});

    useEffect(() => {
      const activeItem = locations.find((loctaiondetails, index) => index.toString() === slideIndex.toString())
      setBooking(activeItem)
    }, [slideIndex])
  
    const onClickHandler = swiper => {
      if (swiper.clickedSlide) {
        if (swiper.clickedSlide.attributes) {
          var a = swiper.clickedSlide.attributes.getNamedItem('data-swiper-slide-index').value;
          setSlideIndex(a);
        }
      }
    }
    return (
        <div className={classes.rootHome}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paperItemDescription}>
                        <Typography variant="h3" gutterBottom style={{textAlign: 'center'}}>
                            {booking.title}
                        </Typography>
                        <Typography variant="body1" gutterBottom style={{textAlign: 'justify'}}>
                            {booking.description}
                        </Typography>
                        <Button variant="contained" className={classes.bookingButton}  onClick={() => history.push(`/booking/${booking.id}`)}>
                            Booking <ArrowForwardIcon />
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Paper className={classes.paperSlider}>
                        <Swiper
                            spaceBetween={15}
                            slidesPerView={3}
                            navigation
                            autoplay={{
                            delay: 2000,
                            disableOnInteraction: false
                            }}
                            loop={true}
                            onClick={(swiper) => onClickHandler(swiper)}
                            onSlideChange={(swiper) => setSlideIndex(swiper.realIndex)}
                        >
                            {locations.map(loctaiondetails => {
                                return (<SwiperSlide key={loctaiondetails.id}>
                                    {({ isActive }) => (
                                    <LocationDetails isActive={isActive} location={loctaiondetails} />
                                    )}
                                </SwiperSlide>)
                            })}
                        </Swiper>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;