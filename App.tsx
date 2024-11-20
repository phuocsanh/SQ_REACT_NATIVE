/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import RootStack from 'navigation/RootStack';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {useColorScheme} from 'react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return <RootStack />;
}

export default App;
