const initialState = {state: false};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'LOCATION_STATE':
      return action.state;

    default:
      return state;
  }
}
