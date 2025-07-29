import {  useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }: any) => {
      const router = useRouter();

   const handleGetStarted = () => {
    router.replace("/auth/AuthScreen");
  };

  return (
    <Swiper
      loop={false}
      showsPagination={true}
      activeDotColor="#4f46e5"
    >
      {/* Slide 1 */}
      <View style={styles.slide}>
        <Image
          source={require('@/assets/microcasque.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to Podcastify</Text>
        <Text style={styles.text}>Listen to your favorite creators and discover new voices.</Text>
      </View>

      {/* Slide 2 */}
      <View style={styles.slide}>
        <Image
          source={require('@/assets/discover.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Discover Podcasts</Text>
        <Text style={styles.text}>Browse trending episodes and curated playlists daily.</Text>
      </View>

      {/* Slide 3 */}
      <View style={styles.slide}>
        <Image
          source={require('@/assets/micropodcaster.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Start Your Podcast</Text>
        <Text style={styles.text}>Create, upload and grow your audience with ease.</Text>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: width * 0.8,
    height: height * 0.45,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e1b4b',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
