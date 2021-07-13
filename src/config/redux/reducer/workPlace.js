const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADDMYWORKPLACE':
      return [...state, action.payload];
    case 'MINMYWORKPLACE':
      const getFilter = state.filter(
        (a) => a.idWorkPlace != action.payload.idWorkPlace,
      );

      return getFilter;

    case 'NULLWORKPLACE':
      return [];

    default:
      return state;
  }
}
