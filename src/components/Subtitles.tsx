import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { parseVTT } from 'scripts/parseVTT';

export default function Subtitles({ uri }: { uri: string }) {
  const [subtitles, setSubtitles] = useState<
    { start: number; end: number; text: string }[]
  >([]);
  const [currentText, setCurrentText] = useState('');
  const { position } = useProgress();

 useEffect(() => {
    const loadVTT = async () => {
      console.log('[Subtitles] Chargement du fichier VTT:', uri);
      try {
        const response = await fetch(uri);
        const text = await response.text();
        console.log('[Subtitles] Contenu brut VTT:', text);
        const parsed = parseVTT(text);
        console.log('[Subtitles] Sous-titres parsés:', parsed);
        setSubtitles(parsed);
      } catch (error) {
        console.error('[Subtitles] Erreur chargement VTT:', error);
      }
    };

    loadVTT();
  }, [uri]);

  useEffect(() => {
    const currentSubtitle = subtitles.find(
      (s) => position >= s.start && position <= s.end
    );
    if (currentSubtitle) {
      setCurrentText(currentSubtitle.text);
    } else {
      setCurrentText('');
    }
  }, [position, subtitles]);

  return (
    <View style={{ padding: 10, alignItems: 'center' }}>
      <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>
        {currentText}
      </Text>
    </View>
  );
}
