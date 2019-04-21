import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import React from 'react';

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  const {lat, lng} = props.currentLocation
  return(
    <GoogleMap
      defaultZoom={15}
      center={{lat: lat, lng: lng}}
      // defaultCenter={{lat: 33.6349, lng: -117.74049}}
    >
      {props.isMarkerShown && <Marker position={{lat: lat, lng: lng}}/>}
      {/* {props.isMarkerShown && <Marker position={{lat: 33.6349, lng: -117.74049}} />} */}
    </GoogleMap>
  )

}))

export default MyMapComponent;
