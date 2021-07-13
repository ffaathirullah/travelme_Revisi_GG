const doAuthLogout = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUTADMINUSER',
    });
  };
};

export {doAuthLogout};
