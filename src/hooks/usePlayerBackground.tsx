import { useEffect, useState, useRef } from 'react'
import { getColors } from 'react-native-image-colors'
import { IOSImageColors } from 'react-native-image-colors/build/types'
import { colors } from '@/constants/tokens'

export const usePlayerBackground = (imageUrl: string) => {
	const [imageColors, setImageColors] = useState<IOSImageColors | null>(null)
	const lastImageUrl = useRef<string | null>(null)

	useEffect(() => {
		// Vérifier si l'URL a changé avant de recalculer les couleurs
		if (imageUrl && imageUrl !== lastImageUrl.current) {
			lastImageUrl.current = imageUrl

			getColors(imageUrl, {
				fallback: colors.background,
				cache: true,
				key: imageUrl,
			}).then((colors) => setImageColors(colors as IOSImageColors))
		}
	}, [imageUrl])

	return { imageColors }
}
