import { colors } from '@/core/theme'
import { useEffect, useState, useRef } from 'react'
import { getColors } from 'react-native-image-colors'
import { IOSImageColors } from 'react-native-image-colors/build/types'

export const usePlayerBackground = (imageUrl: string) => {
	const [imageColors, setImageColors] = useState<IOSImageColors | null>(null)
	const lastImageUrl = useRef<string | null>(null)

	useEffect(() => {
		if (imageUrl && imageUrl !== lastImageUrl.current) {
		  console.log("URL Changed:", imageUrl);  // Ajout du log pour l'URL
		  lastImageUrl.current = imageUrl;
	  
		  getColors(imageUrl, {
			fallback: colors.background,
			cache: true,
			key: imageUrl,
		  }).then((colors) => {
			console.log("Colors fetched:", colors); // Ajout du log pour les couleurs récupérées
			setImageColors(colors as IOSImageColors);
		  }).catch(error => {
			console.error("Error fetching colors:", error);  // Log d'erreur pour le cas où `getColors` échoue
		  });
		}
	  }, [imageUrl]);
	  

	return { imageColors }
}
