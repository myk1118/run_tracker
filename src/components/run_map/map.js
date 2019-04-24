import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline} from 'react-google-maps';
import React from 'react';

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  const { lat, lng } = props.currentLocation
  return (
    <GoogleMap
      defaultZoom={15}
      center={{ lat: lat, lng: lng }}
    >
      {props.isMarkerShown && <Marker position={{ lat: lat, lng: lng }} />}
    </GoogleMap>
  )

}))

export default MyMapComponent;
