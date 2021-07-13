import React from 'react';

const firebaseContext = React.createContext(null);

export const withFirebase = (Component) => (props) => {
  return (
    <firebaseContext.Consumer>
      {(firebase) => <Component {...props} firebase={firebase} />}
    </firebaseContext.Consumer>
  );
};

export default firebaseContext;
