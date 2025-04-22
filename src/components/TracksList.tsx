/* import React from 'react';
import { FlatList, View, StyleSheet , Text} from 'react-native';
import { TracksListItem } from './TracksListItem';
import TrackPlayer, { Track } from 'react-native-track-player';
import { defaultStyles, utilsStyles } from '@/styles';
import FastImage from 'react-native-fast-image';
import { unknownTrackImageUri } from '@/constants/images';
import { colors } from '@/core/theme';

export const TracksList = ({ data }: { data: Track[] }) => {
  const handleTrackSelect = async(track: Track) => {
    await TrackPlayer.load(track)  
    await TrackPlayer.play()
};
  
  return (
    <FlatList
      data={data}
      
      ListEmptyComponent={<View>
        <Text style={
          utilsStyles.emptyContentText}> No Podcasts found</Text>
          <FastImage source={{uri:unknownTrackImageUri, priority:FastImage.priority.normal}}></FastImage>
      </View>}
      renderItem={({ item: track })  => (
        <View style={styles.gridItem}>
          <TracksListItem track={track} onTrackSelect={handleTrackSelect} />
        </View>
      )}
      keyExtractor={(item) => item.url}
      numColumns={2}
      columnWrapperStyle={styles.row}
    />
  );
};
const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
  },
  gridItem: {
    flex: 1,
    margin: 10,
  },
  emptyContentText:{
    ...defaultStyles.text,
    color:colors.textMuted,
    textAlign:'center',
    marginTop:20,
  },
  emptyContentImage:{
    width:200,
    height:200,
    alignSelf:'center',
    marginTop:40,
    opacity:0.3
  }
});


 */
import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { TracksListItem } from './TracksListItem'; // Assurez-vous que ce composant gère correctement le style
import TrackPlayer, { Track } from 'react-native-track-player';
import { defaultStyles, utilsStyles } from '@/styles';
import FastImage from 'react-native-fast-image';
import { unknownTrackImageUri } from '@/constants/images';
import { colors } from '@/core/theme';
import { router } from 'expo-router';

export const TracksList = ({ data }: { data: Track[] }) => {

  const handleTrackSelect = async (track: Track) => {
    await TrackPlayer.load(track);
    await TrackPlayer.play();
    router.push('/player'); // Redirige vers PlayerScreen

  };

  return (
    <FlatList
    
      data={data}
      horizontal // Affiche les éléments horizontalement
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles.emptyContentText}>No Podcasts found</Text>
          <FastImage
				source={{ uri:  unknownTrackImageUri }}
				style={styles.trackArtworkImage}
			/>
        </View>
      }
      renderItem={({ item: track }) => (
        <View style={styles.gridItem}>
          <TracksListItem track={track} onTrackSelect={handleTrackSelect} />
        </View>
      )}
      keyExtractor={(item) => item.url}
      contentContainerStyle={styles.contentContainer} // Optional, to add margin/padding to the list
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 80 ,
    paddingHorizontal: 10, // Ajustez la marge horizontale si nécessaire
  },
  gridItem: {
    marginHorizontal: 10, // Ajoutez de la marge entre les éléments
  },
  emptyContentText: {
    ...defaultStyles.text,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 20,
  },
  emptyContentImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 40,
    opacity: 0.3,
  },trackArtworkImage: {
		width: 40,
		height: 40,
		borderRadius: 8,
	},
});
