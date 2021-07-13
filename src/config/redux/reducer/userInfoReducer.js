const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case 'MYSTATUS':
      return {...action.payload};

    case 'NULLMYSTATUS':
      return null;

    default:
      return state;
  }
}
