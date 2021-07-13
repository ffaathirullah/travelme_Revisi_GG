const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADDMYREQUEST':
      return [...state, action.payload];

    case 'DELETEMYREQUEST':
      const getFilter = state.filter(
        (a) => a.otherUid != action.payload.otherUid,
      );
      return getFilter;

    case 'MODIFIEDMYREQUEST':
      const getIndex = state
        .map((id) => id.otherUid)
        .indexOf(action.payload.otherUid);
      state[getIndex] = action.payload;

      return state;

    case 'NULLMYREQUEST':
      return [];

    default:
      return state;
  }
}
