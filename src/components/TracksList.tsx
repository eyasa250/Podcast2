import React from 'react';
import { FlatList, View, StyleSheet , Text} from 'react-native';
import { TracksListItem } from './TracksListItem';
import TrackPlayer, { Track } from 'react-native-track-player';
import { defaultStyles, utilsStyles } from '@/styles';
import { colors } from '@/constants/tokens';
import FastImage from 'react-native-fast-image';
import { unknownTrackImageUri } from '@/constants/images';

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


