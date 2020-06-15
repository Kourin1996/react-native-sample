module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv'
  ],
  plugins: [
    ['module-resolver', {
      'root': ['./src'],
      'extensions': ['.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ios.tsx', '.android.tsx', '.ts', '.tsx'],
      'alias': {
        '@assets': './assets',
        '@components': './components',
        '@models': './models',
        '@navigations': './navigations',
        '@repositories': './repositories',
        '@scenes': './scenes',
        '@utils': './utils'
      }
    }]
  ]
};
