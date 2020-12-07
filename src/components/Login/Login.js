import React, {useState, useContext, useEffect} from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { Box, Button, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {UserContext} from '../../App';
import handleError from './ErrorHandle'; 
import firebase from 'firebase/app';
import 'firebase/auth'; 
// import { useHistory, useLocation } from 'react-router-dom';

import {createUserWithEmailAndPassword, initializeFirebase, handleGoogleSignIn, handleFacebookLogIn } from './Auth'; 
// import { css } from "@emotion/core";
// import FadeLoader from "react-spinners/FadeLoader";
initializeFirebase(); 

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

    // const [hasAccount, setHasAccount] = useState(true); 

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [loading, setLoading] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [userInfo, setUserInfo] = useState({ ...initUser });

    const googleSignIn = () => {
        handleGoogleSignIn()
          .then(res => {
            if (res.error) {
              setUserInfo({ ...userInfo, errors: res })
            } else {
              setUser({ ...res })
              history.replace(from)
            }
        })
    }

    const facebookLogIn = () => {
        handleFacebookLogIn()
            .then(res =>{
                if (res.error) {
                    setUserInfo({ ...userInfo, errors: res })
                } 
                else {
                    setUser({ ...res })
                    history.replace(from)  
                }
            })
    }

    const onChangeHandler = e => {
        setUserInfo(previousState => ({ ...previousState, [e.target.name]: e.target.value }))
        e.persist()
    }

    // const override = css`
    //         display: block;
    //         margin: 0 auto;
    //         display:flex;
    //         color:#000;`
    //     ;

    const submitHandler = e => {
        const errors = handleError(userInfo);
        setUserInfo({ ...userInfo, errors })
        console.log(userInfo.errors)
        if (Object.keys(errors).length === 0 && newUser) {
          setLoading(true)
          createUserWithEmailAndPassword({ firstName, lastName, email, password })
            .then(res => {
              setLoading(false)
              if (res.error) {
                setUserInfo({ ...userInfo, errors: res })
              } else {
                setUser({ ...res })
                history.replace(from)
              }
            })
        }
        if (!errors.email && !errors.password) {
            if (userInfo.password && userInfo.email && !newUser) {
                firebase.auth().signInWithEmailAndPassword(email, password)
                .then(res => {
                    const data= {
                        name : res.user.displayName,
                        email : res.user.email
                    }
                    setUser({ ...data }) 
                    console.log(user);
                })
                .catch((error) => {
                    const errors = {};
                    const errorCode = error.code;
                    if(errorCode === 'auth/user-not-found'){
                        errors.error = "No user Found with this email!";
                    }
                    else if(errorCode === 'auth/user-not-found'){
                        errors.error = "Incorrect Password for this email!";
                    }
                    else{
                        errors.error = error.message;
                    }
                    console.log(errors.error); 
                    console.log(userInfo)
                    setUserInfo({ ...userInfo, errors: errors.error })
                    console.log(userInfo.errors)
                });
            }
        }
        e.preventDefault();
    }

    useEffect(() => {
        setUserInfo({ ...initUser })
    }, [newUser])
    
    // useEffect(() => {
    //     console.log('login');
    // }, [])

    const { firstName, lastName, email, password, confirmPassword, errors } = userInfo;
    
    if (user) {
        return <Redirect to='/' />
    }
    

    
    return (
        <div style={{marginBottom: '100px'}}>
            <Box className={classes.box}>
                <h6 className={classes.boxHeading}>
                    { newUser ? 'Create an Account' : 'Log In'}
                </h6>
                <form onSubmit={submitHandler}>
                    {newUser && (
                        <TextField 
                            
                            label="First Name" 
                            name="firstName" 
                            className={classes.input}
                            onBlur= {onChangeHandler}
                            error={errors.firstName}
                            required
                        />
                    )}
                    {newUser && (
                        <TextField 
                            
                            label="Last Name" 
                            name="lastName" 
                            className={classes.input}
                            onBlur= {onChangeHandler}
                            error={errors.lastName}
                            required
                        />
                    )}
                    <TextField 
                        // value={email}
                        name="email"  
                        label="Email" 
                        className={classes.input} 
                        type="email" 
                        onBlur={onChangeHandler} 
                        error={errors.email}
                        required
                    />
                    <TextField 
                        // value={password}
                        name="password"  
                        label="Password" 
                        className={classes.input} 
                        type="password" 
                        onBlur={onChangeHandler} 
                        error={errors.password}
                        required
                    />     
                    {newUser && (
                        <TextField 
                            
                            name="confirmPassword"  
                            label="Confirm Password" 
                            className={classes.input} 
                            type="password" 
                            onBlur={onChangeHandler} 
                            error={errors.confirmPassword}
                            required
                        />  
                    )} 

                    {errors.error && (
                    <p className="text-danger text-center  py-2" style={{color: 'red'}}>
                        {errors.error}
                    </p>
                    )}
                    <Button className={classes.btn} variant="contained" type="submit">
                    {newUser ? 'Create an Account' : 'Login'}
                    </Button>
                </form>
                <p className="text-center pt-2">
                    {newUser ? 'Already have an account' : 'Don’t have an account'} ?
                    <span onClick={() => setNewUser(!newUser)} className={classes.toggleButton}>
                    {newUser ? ' Login' : ' Create an account'}
                    </span>
                </p>
            </Box>

            <Box style={{margin: 'auto', width: '30%'}}>
                <div style={{marginBottom: '30px'}}>{DividerWithText()}</div>
                <Button  className={classes.socialLoginBtn} onClick={facebookLogIn}>
                    <img src="https://i.ibb.co/G0cKsnq/fb.png" className={classes.socialLoginIcon} alt="Facebook" />
                    <span style={{ margin: 'auto',textAlign: 'center'}}>Continue with Facebook</span>
                </Button>
                <br />
                <Button  className={classes.socialLoginBtn} onClick={googleSignIn}>
                    <img src="https://i.ibb.co/9NPV9n2/google.png" className={classes.socialLoginIcon} alt="Google" />
                    <span style={{ margin: 'auto',textAlign: 'center'}}>Continue with Google</span>
                </Button>
            </Box>
            
        </div>

    );
};

export default Login;