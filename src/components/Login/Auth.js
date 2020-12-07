import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeFirebase = () => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
}

export const createUserWithEmailAndPassword = ({ firstName, lastName, email, password }) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(res => {
    const name = `${firstName + ' ' + lastName}`;
      const { email } = res.user;
      const singedInUser = {
        name,
        email,
      }
      updateUserName(name);
      // verifyEmail();
      return singedInUser;
  })
  .catch((error) => {
    const errors = {}
      if (error.code === 'auth/email-already-in-use') {
        errors.error = "The email address is already in use by another account!";
      }
      else {
        errors.error = error.message;
      }
      return errors;
  });
}

export const signInWithEmailAndPassword = ({email, password}) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(res => {
    console.log(res)
    const { displayName, email } = res.user;
      const user = {
        name: displayName,
        email: email,
      }
      return user;
  })
  .catch((error) => {
    const errors = {}
      errors.error = error.message;
      // if (error.code === 'auth/user-not-found') {
      //   errors.error = "No user found with this email!";
      // }
      // else if (error.code === 'auth/wrong-password') {
      //   errors.error = "The password that you've entered is incorrect!";
      // } else {
      //   errors.error = error.message;
      // }
    return errors;
  });

}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const user = {
          name: displayName,
          email: email,
          photo: photoURL,
          
        }
        return user;
      })
      .catch(error => {
        const errors = {}
        errors.error = error.message;
        return errors;
      });
}

export const handleFacebookLogIn = () => {
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  return  firebase.auth().signInWithPopup(facebookProvider)
          .then(res => {
            const {displayName, email} = res.user;
            const user = {
              name: displayName,
              email: email,
              // photoURL: photoURL
            }
      }).catch(function(error) {
        const errors = {}
        errors.error = error.message;
        return errors;
      });
}

  const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then(function () {
      return 'User name update successfully';
    }).catch(error => {
      return error
    });
  }
  
  export const handleSignOut = () => {
    return firebase.auth().signOut()
      .then(() => {
        return null;
      })
      .catch(error => {
        console.log(error)
      })
  }

  export const getCurrentUser = () => {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          const { displayName, email, photoURL } = user;
          const currentUser = {
            name: displayName,
            email: email,
            photo: photoURL,
            // emailVerified
          }
          resolve(currentUser)
          // ...
        } else {
          resolve(user)
        }
      });
    });
  }