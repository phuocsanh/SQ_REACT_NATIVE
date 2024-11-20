module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ts',
          '.tsx',
          '.js',
          '.json',
          '.ios.js',
          '.android.js',
          '.ios.ts',
          '.android.ts',
          '.ios.tsx',
          '.android.tsx',
        ],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
