// app/settings/SettingsScreen.tsx

import React from 'react';
import { View, Text, Switch } from 'react-native';

const SettingsScreen = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Paramètres</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
        <Text>Mode sombre</Text>
        <Switch onValueChange={toggleSwitch} value={isEnabled} />
      </View>
    </View>
  );
};

export default SettingsScreen;
