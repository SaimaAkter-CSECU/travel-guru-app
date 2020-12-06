import { Card, CardActionArea, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import './Home.css'; 

const useStyles = makeStyles((theme) => ({
    cardContent: {
        
    },
    cardImg: {
        width: '100%',
        height: '350px',
        position: 'absolute',
    },
    cardTitle:{
        position: 'absolute',
        color: '#ececec',
        margin: '96% auto 0px',
        padding: '20px'
    }
}));

const LocationDetails = ({ location, isActive }) => {
    const classes = useStyles();
    const { title, imgUrl } = location;
    return (
        <Card className={`${isActive ? 'active cardContent' : 'not-active cardContent'}`} >
            <CardActionArea>
                <CardMedia
                    image={imgUrl}
                    title={title}
                    className={classes.cardImg}
                />
                <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                    {title}
                </Typography>
            </CardActionArea>
        </Card>
    );
};

export default LocationDetails;