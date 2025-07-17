// components/PremiumBottomBanner.tsx
import { colors } from '@/core/theme';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const PremiumBottomBanner = () => {
  return (
    <View style={styles.container}>
      <View style={styles.previewRow}>
        <Image
         // source={require('@/assets/premium-preview.jpg')} // à adapter selon ton image
          style={styles.previewImage}
        />
        <View style={styles.previewText}>
          <Text style={styles.title}>Get Access to All Full HD Contents</Text>
        </View>
      </View>
      <ScrollView horizontal style={styles.horizontalOptions}>
        {/* Ici tu peux mettre des cartes d’avantages premium */}
        <View style={styles.premiumCard}><Text style={styles.cardText}>No Ads</Text></View>
        <View style={styles.premiumCard}><Text style={styles.cardText}>Exclusive Podcasts</Text></View>
        <View style={styles.premiumCard}><Text style={styles.cardText}>Offline Listening</Text></View>
      </ScrollView>
      <TouchableOpacity style={styles.upgradeBtn}>
        <Text style={styles.upgradeText}>👑 Upgrade to Premium</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  previewText: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
  },
  horizontalOptions: {
    marginTop: 15,
  },
  premiumCard: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
  },
  cardText: {
    color: '#fff',
  },
  upgradeBtn: {
    backgroundColor:colors.primary,
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  upgradeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PremiumBottomBanner;
