import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/core/theme';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
type RoutePath = `/${string}`;

const allOptions: {
  icon: string;
  label: string;
  route: string;
  roles?: string[];
}[] = [

  {
    icon: "mic-outline",
    label: "My Podcasts",
    route: "/(tabs)/library/podcastListScreen?type=own",
    roles: ["PODCASTER"],
  },
    { icon: 'checkmark-circle-outline',
     label: 'subscription',  
    route: "/(tabs)/library/podcastListScreen?type=subscriptions",
 },
   {
    icon: "bookmark-outline",
    label: "Favorites",
    route: "/(tabs)/library/episodeListScreen?type=favorites",
  },
   { icon: 'time-outline',
     label: 'recently viewed',  
    route: "/(tabs)/library/episodeListScreen?type=history",
 },
  { icon: 'download-outline', label: 'Downloads', route: '/downloads', roles: ['podcaster'] },
  { icon: 'settings-outline', label: 'Settings', route: '/settings' },
 
];

const ProfileOptionList = () => {
  const { user } = useAuth();

  const filteredOptions = allOptions.filter((opt) => {
    if (opt.roles) return opt.roles.includes(user?.role);
    return true;
  });

  return (
    <View style={styles.container}>
      {filteredOptions.map((opt, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => router.push(opt.route)}
        >
          <Ionicons name={opt.icon as any} size={20} color="#2F2F2FFF" />
          <Text style={styles.label}>{opt.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#444',
    borderBottomWidth: 0.5,
  },
  label: {
    color: colors.text,
    fontSize: 16,
    marginLeft: 12,
  },
});

export default ProfileOptionList;
