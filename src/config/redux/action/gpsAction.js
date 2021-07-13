export function locationCheck(
  geolocationSettings = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 10000,
    distanceFilter: 10,
  },
) {
  return async (dispatch) => {
    navigator.geolocation.watchPosition(
      () => {
        dispatch({
          type: 'LOCATION_STATE',
          state: true,
        });
      },
      () => {
        dispatch({
          type: 'LOCATION_STATE',
          state: false,
        });
      },
      geolocationSettings,
    );
  };
}
