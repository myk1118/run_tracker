import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import React from 'react';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={20}
    defaultCenter={props.coordinates}
    // defaultCenter={{lat: 34, lng: 56}}
  >
    {props.isMarkerShown && <Marker position={props.coordinates} />}
    {/* {props.isMarkerShown && <Marker position={{lat: 34, lng: 56}} />} */}
  </GoogleMap>
))

export default MyMapComponent;
