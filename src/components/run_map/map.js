import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import React from 'react';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={20}
    // defaultCenter={props.coordinates}
    defaultCenter={{lat: 33.6349, lng: -117.74049}}
    // defaultCenter={{lat: props.latitude, lng: props.longitude}}
  >
    {/* {props.isMarkerShown && <Marker position={props.coordinates} />} */}
    {props.isMarkerShown && <Marker position={{lat: 33.6349, lng: -117.74049}} />}
    {/* {props.isMarkerShown && <Marker position={{lat: props.latitude, lng: props.longitude}} />} */}
  </GoogleMap>
))

export default MyMapComponent;
