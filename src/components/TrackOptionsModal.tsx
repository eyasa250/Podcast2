import React, { forwardRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/core/theme';

type TrackOptionsModalProps = {
  trackTitle?: string;
  artist?: string;
  onLike?: () => void;
  onAddToPlaylist?: () => void;
};

export const TrackOptionsModal = forwardRef<Modalize, TrackOptionsModalProps>(
  ({ trackTitle, artist, onLike, onAddToPlaylist }, ref) => {
    return (
      <Modalize ref={ref} snapPoint={350} modalHeight={400}>
        <View style={styles.container}>
          <Text style={styles.title} numberOfLines={2}>
            {trackTitle} - {artist}
          </Text>

          <OptionItem icon="heart" text="Like" onPress={onLike} />
          <OptionItem icon="plus" text="Add to playlist" onPress={onAddToPlaylist} />
          <OptionItem icon="user" text="View artist" />
          <OptionItem icon="compact-disc" text="View album" />
          <OptionItem icon="eye-slash" text="hide this podcast" />
          <OptionItem icon="share-nodes" text="Share" />

        </View>
      </Modalize>
    );
  }
);

// Sous-composant pour éviter de répéter le même style
const OptionItem = ({
  icon,
  text,
  onPress,
}: {
  icon: React.ComponentProps<typeof FontAwesome6>['name'];
  text: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.optionButton} onPress={onPress}>
    <FontAwesome6 name={icon} size={18} color="white" style={styles.optionIcon} />
    <Text style={styles.optionText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#2c2c2c',
  },
  optionIcon: {
    marginRight: 14,
  },
  optionText: {
    fontSize: 16,
    color: 'white',
  },
});
