// MediaDisplay.tsx
import React, { useEffect, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import Video from 'react-native-video'
import FastImage from 'react-native-fast-image'
import { useProgress } from 'react-native-track-player'
import { colors } from '@/core/theme'

type Props = {
  url: string
  artwork: string
  isPlaying: boolean
  trackType: 'video' | 'audio'
  onVideoEnd?: () => void
}

export const MediaDisplay = ({ url, artwork, isPlaying, trackType, onVideoEnd }: Props) => {
  const videoRef = useRef<any>(null)
  const { position } = useProgress()

  // Sync la position de la vidéo avec TrackPlayer
  useEffect(() => {
    if (trackType === 'video' && videoRef.current && position) {
      videoRef.current.seek(position)
    }
  }, [position, trackType])

  return (
    <View style={styles.container}>
      {trackType === 'video' ? (
        <Video
          ref={videoRef}
          source={{ uri: url }}
          style={styles.video}
          paused={!isPlaying}
          resizeMode="contain"
          controls={false}
          onEnd={onVideoEnd}
        />
      ) : (
        <FastImage
          style={styles.image}
          source={{ uri: artwork }}
          resizeMode={FastImage.resizeMode.cover}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
})
