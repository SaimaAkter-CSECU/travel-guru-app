import React, {useState, useContext} from 'react';

import firebase from 'firebase/app';
import 'firebase/auth'; 
import firebaseConfig from './firebase.config'; 
firebase.initializeApp(firebaseConfig);


import { Box, Button, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {UserContext} from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

// import {initializeFirebase} from './Auth'; 



const initUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: {}
}

const useStyles = makeStyles((theme) => ({
    boxHeading: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: '24px',
        lineHeight: '29px',
        margin: '0px 0px 20px 0px',
    },
    box: {
        width: '450px', 
        margin: '40px auto', 
        padding: '40px',
        background: 'rgba(255, 255, 255, 0.2)',
        border: '2px solid #ABABAB',
        boxSizing: 'border-box',
        borderRadius: '4px',
    },
    input: {
        fontFamily: 'Montserrat',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '20px',
        color: '#000000',
        width: '100%',
        marginBottom: '10px',
    },
    checkBox: {
        fontSize: '12px',
    },
    btn: {
        width: '100%',
        marginTop: '30px',
        background: '#F9A51A',
        borderRadius: '5px',
        color: 'black',
        '&:hover': {
          background: '#F9A51A',
          borderRadius: '5px',
          color: 'white',
        },
    },
    toggleButton: {
        cursor: 'pointer',
        color: '#F9A51A', 
        '&:hover': {
            textDecoration: 'underline', 
          },
    },
    socialLoginBtn: {
        width: '400px',
        background: '#FFFFFF',
        border: '1px solid #C7C7C7',
        boxSizing: 'border-box',
        borderRadius: '57px',

        fontFamily: 'Montserrat',
        fontWeight: '500',
        fontSize: '18px',
        color: '#000000',
        textTransform: 'capitalize',
        padding: '5px 10px',
        marginBottom: '15px',
    },
    socialLoginIcon: {
        width: '37px', 
        height: '37px', 
        textAlign: 'left', 
    },
    container: {
        display: "flex",
        alignItems: "center"
    },
    border: {
        borderBottom: "2px solid #AAAAAA",
        width: "100%"
    },
    content: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        fontFamily: 'Avenir',
        fontWeight: 500,
        fontSize: 16,
        color: '#000000',
    },
}));

const Login = () => {
    const classes = useStyles();

    const { user, setUser } = useContext(UserContext); 
    const DividerWithText = () => {
        return (
            <div className={classes.container}>
              <div className={classes.border} />
              <span className={classes.content}>Or</span>
              <div className={classes.border} />
            </div>
        );
    }

    const [hasAccount, setHasAccount] = useState(true); 

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [newUser, setNewUser] = useState(true);
    const [userInfo, setUserInfo] = useState({ ...initUser });

    
    return (
        <div style={{marginBottom: '100px'}}>
            {
                hasAccount ? 
                    <Box className={classes.box}>
                        <h6 className={classes.boxHeading}>Log in</h6>
                        <form >
                            <TextField name="email"  label="Username or Email" className={classes.input} required/>
                            <br />
                            <TextField name="password"  label="Password" className={classes.input} type="password" required />
                            < br />
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <FormControlLabel
                                    control={<Checkbox name="checkbox" style={{padding: '2px 5px'}} />}
                                    label="Remember Me" className={classes.checkBox} style={{fontSize: '12px'}}
                                />
                                <a className={classes.toggleButton} style={{paddingTop: '5px'}}>Forget Password</a>
                            </div>
                        </form>
                        <Button variant="contained" className={classes.btn} >
                            Login
                        </Button>
                        <p style={{color: 'red', marginTop: '10px'}}>Error</p>
                        <p>Don't have an account? <span><a className={classes.toggleButton} onClick={() => setHasAccount(!hasAccount)} >Create an Account</a></span></p>
                    </Box>
                :
                    <Box className={classes.box}>
                        <h6 className={classes.boxHeading}>Create an Account</h6>
                        <form>
                            <TextField label="First Name" className={classes.input}/>
                            <br />
                            <TextField label="Last Name" className={classes.input}/>
                            <br />
                            <TextField label="Username or Email" className={classes.input}/>
                            <br />
                            <TextField type="password" label="Password" className={classes.input}/>
                            <br />
                            <TextField type="password" label="Confirm Password" className={classes.input}/>
                        </form>
                        <Button variant="contained" className={classes.btn} >
                            Create an Account
                        </Button>
                        <p>Already have an account? <span><a className={classes.toggleButton} onClick={() => setHasAccount(!hasAccount)}>Login</a></span></p>
                    </Box>
            }

            <Box style={{margin: 'auto', width: '30%'}}>
                <div style={{marginBottom: '30px'}}>{DividerWithText()}</div>
                <Button  className={classes.socialLoginBtn}>
                    <img src="https://i.ibb.co/G0cKsnq/fb.png" className={classes.socialLoginIcon} alt="Facebook" />
                    <span style={{ margin: 'auto',textAlign: 'center'}}>Continue with Facebook</span>
                </Button>
                <br />
                <Button  className={classes.socialLoginBtn}>
                    <img src="https://i.ibb.co/9NPV9n2/google.png" className={classes.socialLoginIcon} alt="Google" />
                    <span style={{ margin: 'auto',textAlign: 'center'}}>Continue with Google</span>
                </Button>
            </Box>
            
        </div>

    );
};

export default Login;