import { Picker } from '@react-native-picker/picker';
import { Platform, Text, StyleSheet } from 'react-native';
import { type TextTrack, type SelectedTrack, SelectedTrackType } from 'react-native-video';
import React from 'react';

export interface TextTrackSelectorType {
  textTracks: Array<TextTrack>;
  selectedTextTrack: SelectedTrack | undefined;
  onValueChange: (arg0: string) => void;
  textTracksSelectionBy: string;
}

export const TextTrackSelector = ({
  textTracks,
  selectedTextTrack,
  onValueChange,
  textTracksSelectionBy,
}: TextTrackSelectorType) => {
  return (
    <>
      <Text style={styles.controlOption}>TextTrack</Text>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={`${selectedTextTrack?.value}`}
        onValueChange={itemValue => {
          if (itemValue !== 'empty') {
            onValueChange(itemValue);
          }
        }}>
        {textTracks?.length <= 0 ? (
          <Picker.Item label={'empty'} value={'empty'} key={'empty'} />
        ) : (
          <Picker.Item label={'none'} value={'none'} key={'none'} />
        )}
        {textTracks.map(track => {
          if (!track) {
            return;
          }
          let value;
          if (textTracksSelectionBy === SelectedTrackType.INDEX) {
            value = track.index;
          } else if (textTracksSelectionBy === SelectedTrackType.LANGUAGE) {
            value = track.language;
          } else if (textTracksSelectionBy === SelectedTrackType.TITLE) {
            value = track.title;
          }
          return <Picker.Item label={`${value}`} value={value} key={value} />;
        })}
      </Picker>
    </>
  );
};

const styles = StyleSheet.create({
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  picker: {
    flex: 1,
    color: Platform.OS === 'web' ? 'black' : 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 100,
    height: 40,
  },
  pickerItem: {
    color: 'white',
    width: 100,
    height: 40,
  },
});
