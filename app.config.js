import 'dotenv/config';

export default {
  expo: {
    name: 'Podcast2',
    slug: 'Podcast2',
    scheme: 'podcast2', // <-- ajoute cette ligne (nom en minuscules conseillé)
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.anonymous.Podcast2',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-video',
        {
          supportsBackgroundPlayback: true,
          supportsPictureInPicture: true,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
  },
};
