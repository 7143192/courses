import {LogBox} from 'react-native';

if (__DEV__) {
  const ignoreWarns = [
    'EventEmitter.removeListener',
    '[fuego-swr-keys-from-collection-path]',
    'Setting a timer for a long period of time',
    'ViewPropTypes will be removed from React Native',
    'AsyncStorage has been extracted from react-native',
    "exported from 'deprecated-react-native-prop-types'.",
    'Non-serializable values were found in the navigation state.',
    'VirtualizedLists should never be nested inside plain ScrollViews',
    'Animated: `useNativeDriver`',
    'componentWillReceiveProps',
    'componentWillMount',
    'Each child',
    'Failed prop type: TabNavigator',
    'ERROR SVG',
    'Encountered two children with the same key',
    'Functions are not valid as a React child',
    'source.uri should not be an empty string',
    '`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.',
      'Can\'t perform a React state update on an unmounted component'
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
}
