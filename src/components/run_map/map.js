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
      <Polyline
        path={[
          {lat: 33.6349179, lng: -117.74050049999998},
          {lat: 33.631, lng: -117.61},
          {lat: 33.572, lng: -117.631},
          {lat: 33.467, lng: -117.727}
        ]}
        strokeColor="#FF0000"
      />
    </GoogleMap>
  )

}))

export default MyMapComponent;
