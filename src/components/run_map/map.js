import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline} from 'react-google-maps';
import React from 'react';

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  const { lat, lng } = props.currentLocation
  return (
    <GoogleMap
      defaultZoom={18}
      center={{ lat: lat, lng: lng }}
    >
      {props.isMarkerShown && <Marker animation={google.maps.Animation.DROP} position={{ lat: lat, lng: lng }} />}
      <Polyline
        path={props.coordinateArray}
        strokeColor="#FF0000"
        strokeOpacity="0.8"
      />
    </GoogleMap>
  )

}))

export default MyMapComponent;
