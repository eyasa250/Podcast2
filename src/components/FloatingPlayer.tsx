import { useEffect } from 'react'
import { unknownTrackImageUri } from '@/constants/images'
import { defaultStyles } from '@/styles'
import { useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useActiveTrack } from 'react-native-track-player'
import { CloseButton, PlayPauseButton, SkipToNextButton } from './PlayerControls'
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack'
import { MovingText } from './MovingText'
import { useFloatingPlayer } from '@/hooks/FloatingPlayerContext'

export const FloatingPlayer = ({ style }: ViewProps) => {
	const router = useRouter()
	const { isVisible, hidePlayer, showPlayer } = useFloatingPlayer() // Récupère l'état global

	const activeTrack = useActiveTrack()
	const lastActiveTrack = useLastActiveTrack()
	const displayedTrack = activeTrack ?? lastActiveTrack

	// Réafficher le FloatingPlayer lorsqu'un track est sélectionné
	useEffect(() => {
		if (displayedTrack) {
			showPlayer()
		}
	}, [displayedTrack])

	if (!displayedTrack || !isVisible) return null

	return (
		<TouchableOpacity onPress={() => router.push('/player')} activeOpacity={0.9} style={[styles.container, style]}>
			<FastImage
				source={{ uri: displayedTrack.artwork ?? unknownTrackImageUri }}
				style={styles.trackArtworkImage}
			/>

			<View style={styles.trackTitleContainer}>
				<MovingText
					style={styles.trackTitle}
					text={displayedTrack.title ?? ''}
					animationThreshold={25}
				/>
			</View>

			<View style={styles.trackControlsContainer}>
				<PlayPauseButton iconSize={24} />
				<SkipToNextButton iconSize={22} />
			</View>

			{/* Bouton de fermeture */}
			<CloseButton iconSize={30} onPress={hidePlayer} />

	
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFFFFF', // Fond blanc au lieu de noir
		padding: 8,
		borderRadius: 12,
		paddingVertical: 10,
		position: 'relative',
		shadowColor: '#000', // Ajout d'une ombre pour le contraste
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3, // Ombre pour Android
	},
	trackArtworkImage: {
		width: 40,
		height: 40,
		borderRadius: 8,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackTitle: {
		...defaultStyles.text,
		fontSize: 18,
		fontWeight: '600',
		paddingLeft: 10,
		color: '#252525', // Texte noir au lieu de blanc
	},
	trackControlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		marginRight: 16,
		paddingLeft: 16,
	},
	closeButton: {
		position: 'absolute',
		top: 5,
		right: 5,
		padding: 4,
		backgroundColor: 'rgba(0, 0, 0, 0.1)', // Bouton plus clair
		borderRadius: 12,
	},
})
