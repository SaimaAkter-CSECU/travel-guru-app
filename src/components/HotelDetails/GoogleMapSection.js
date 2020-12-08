import React, {useState, useContext} from 'react'; 
import {UserContext} from '../../App';
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps'; 
// import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
// Geocode.setApiKey("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCWR3biJ8nVOyVfMNbRa77t_9fA4KznF6U");
// Geocode.setLanguage("en");
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCWR3biJ8nVOyVfMNbRa77t_9fA4KznF6U

function Map(){
    const { bookingInformation } = useContext(UserContext);
    const destination = bookingInformation.destination; 
    console.log(destination); 

    // Get latitude & longitude from address.
    // Geocode.fromAddress(destination)
    // .then(response => {
    //     const { lat, lng } = response.results[0].geometry.location;
    //     console.log(lat, lng);
    //     },
    //     error => {
    //     console.error(error);
    //     }
    // );


    return(
        <GoogleMap defaultZoom={100} defaultCenter={{lat:22.356852, lng:91.783180}} />
       
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const GoogleMapSection = () => {
    // const { bookingInformation } = useContext(UserContext);
    // const destination = bookingInformation.destination; 
    // console.log(destination); 
    const [place, setPlace] = useState(null);
    return (
        <div style={{width: '100%', height: '100vh'}}>
            <WrappedMap 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCWR3biJ8nVOyVfMNbRa77t_9fA4KznF6U`} 
                loadingElement={<div style={{height: '100%'}} /> }
                containerElement={<div style={{height: '100%'}} /> }
                mapElement={<div style={{height: '100%'}} /> }
            />
        </div>
    );
};

export default GoogleMapSection;
