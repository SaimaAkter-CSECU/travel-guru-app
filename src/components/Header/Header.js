import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Button, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  navbar: {
    padding: '8px 100px',
  },
  navLink: {
    fontFamily: 'Montserrat',
    fontSize: '18px',
    color: '#FFFFFF',
    margin: '5px 25px',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    '&:hover': {
      borderBottom: '2px solid #ffffff',
    },
  },
  navLink2: {
    fontFamily: 'Montserrat',
    fontSize: '18px',
    color: '#000000',
    margin: '5px 25px',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    '&:hover': {
      borderBottom: '2px solid #000000',
    },
  },
  btn: {
    marginLeft: '30px',
    background: '#F9A51A',
    borderRadius: '5px',
    color: 'black',
    '&:hover': {
      background: '#F9A51A',
      borderRadius: '5px',
      color: 'white',
    },
  },
  search: {
    position: 'relative',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid white',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '370px',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionLink: {
    width: '100%', 
    display: 'flex',
    justifyContent: 'flex-end',
  },
  logo:{
    filter: 'contrast(0) brightness(250%)',
  }

}));
const navbar={
    marginLeft: 'auto',
    display: 'flex',
}

const Header = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
                <Toolbar className={classes.navbar}>
                    <Link href='/'>
                        <img 
                            src="https://i.ibb.co/HrqfVPc/Logo.png" 
                            alt="Travel Guru" 
                            className={`d-inline-block align-top navbar-brand ${location.pathname === '/' || location.pathname.includes("/home") || location.pathname.includes("/booking/") ? classes.logo : ''}`}
                            style={{width: '140px', marginRight: '20px'}}
                        />
                    </Link>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="Search Your Destination"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <div style={navbar} className={`ml-auto d-flex sectionLink ${location.pathname === '/' || location.pathname.includes("/home") || location.pathname.includes("/booking/") ? classes.header2 : 'header'}`} >
                    <Typography className={` ${location.pathname === '/' || location.pathname.includes("/home") || location.pathname.includes("/booking/") ? classes.navLink : classes.navLink2} `} variant="h6" noWrap>
                        <Link href="/" style={{textDecoration: 'none', color: 'inherit'}}>
                            News
                        </Link>
                    </Typography>
                    <Typography className={` ${location.pathname === '/' || location.pathname.includes("/home") || location.pathname.includes("/booking/") ? classes.navLink : classes.navLink2} `} variant="h6" noWrap>
                        <Link href="/" style={{textDecoration: 'none', color: 'inherit'}}>
                            Destination
                        </Link>
                    </Typography>
                    <Typography className={` ${location.pathname === '/' || location.pathname.includes("/home") || location.pathname.includes("/booking/") ? classes.navLink : classes.navLink2} `} variant="h6" noWrap>
                        <Link href="/" style={{textDecoration: 'none', color: 'inherit'}}>
                            Blog
                        </Link>
                    </Typography>
                    <Typography className={` ${location.pathname === '/' || location.pathname.includes("/home") || location.pathname.includes("/booking/") ? classes.navLink : classes.navLink2} `} variant="h6" noWrap>
                        <Link href="/" style={{textDecoration: 'none', color: 'inherit'}}>
                            Contact
                        </Link>
                    </Typography>
                    <a href = "/login" style={{textDecoration: 'none'}}>
                    <Button variant="contained" className={classes.btn}>
                        Login
                    </Button>
                    </a>
                </div>
                </Toolbar>
            </AppBar>
        </div>

    );
};

export default Header;