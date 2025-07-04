import theme from '@/core/theme';
import { useAuth } from '@/hooks/useAuth';
import { Stack } from 'expo-router';
import React from 'react';
import { View, Text,   StyleSheet,
Switch, 
TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsScreen = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch = () => setIsEnabled((prev) => !prev);
  const { signOut, user } = useAuth();

  return (
          <><Stack.Screen options={{ headerShown: false }} />
    
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Paramètres</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
        <Text>Mode sombre</Text>
        <Switch onValueChange={toggleSwitch} value={isEnabled} />
      </View>
         {/* Section Déconnexion */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  </>);
};
const styles = StyleSheet.create({

  settingsButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  settingsText: {
    color: '#fff',
    fontWeight: 'bold',
  },

    logoutButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
    logoutSection: {
    marginTop: 30,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
 
});
export default SettingsScreen;
