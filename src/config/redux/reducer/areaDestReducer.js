const initialState = {prov: null, city: null};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'MYAREADEST':
      return {prov: action.prov, city: action.city};

    case 'NULLMYAREADEST':
      return {prov: null, city: null};

    default:
      return state;
  }
}
