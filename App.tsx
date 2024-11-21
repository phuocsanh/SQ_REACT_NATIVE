/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import RootStack from 'navigation/RootStack';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from 'redux/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <RootStack />
      </PersistGate>
    </Provider>
  );
}

export default App;
