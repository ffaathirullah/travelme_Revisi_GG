const initialState = {myPlace: 0};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GUIDE_MYPLACE':
      return {myPlace: action.payload};

    case 'GUIDE_MYPLACEADD':
      return {myPlace: state.myPlace + 1};

    case 'GUIDE_MYPLACEMIN':
      return {myPlace: state.myPlace - 1};

    default:
      return state;
  }
}
