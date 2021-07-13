import React, {Component} from 'react';
import {LogBox, StyleSheet, Text, View} from 'react-native';
import FirebaseContext, {
  withFirebase,
} from './src/config/firebase/firebaseContext';
import FirebaseInstance from './src/config/firebase/firebaseInstance';
import {Provider} from 'react-redux';
import store from './src/config/redux/store/store';
import {notifMan} from './src/config/notification/notificationManager';

import Router from './src/config/router/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.notify = null;
    notifMan.configure;
  }

  componentDidMount() {
    LogBox.ignoreAllLogs(); //Ignore all log notifications
  }

  render() {
    return (
      <FirebaseContext.Provider value={new FirebaseInstance()}>
        <Provider store={store}>
          <View style={{flex: 1}}>
            <Router />
          </View>
        </Provider>
      </FirebaseContext.Provider>
    );
  }
}

export default withFirebase(App);
