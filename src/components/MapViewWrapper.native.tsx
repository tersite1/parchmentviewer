import React, { forwardRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export type MapRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export const MapViewWrapper = forwardRef<any, any>((props, ref) => {
  return <MapView ref={ref} provider={PROVIDER_GOOGLE} {...props} />;
});

MapViewWrapper.displayName = 'MapViewWrapper';

export const MarkerWrapper = Marker;
export { PROVIDER_GOOGLE };
