import React from 'react';
import LaptopIcon from '@material-ui/icons/Laptop';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    footerDiv: {
        backgroundColor: '#000',
        margin: '0px',
        padding: '10px', 
        bottom: 0,
        position: 'fixed',
        width: '100%',
    },
    text: {
        color: '#ffffff', 
        textAlign: 'center', 
        margin: '5px',
    },
    icon: {
        paddingLeft: '6px',
        paddingRight: '6px', 
    },
  })
);


const Footer = () => {
    const classes = useStyles(); 
    return (
        <div className={classes.footerDiv}>
            <p className={classes.text}>This site is developed by <span className={classes.icon} > <LaptopIcon /> </span> Saima</p>
        </div>
    );
};

export default Footer;