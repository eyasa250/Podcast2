/* import { useEffect, useRef } from 'react';
import { Track, useActiveTrack } from 'react-native-track-player';

export const useLastActiveTrack = () => {
  const activeTrack = useActiveTrack();
  const lastActiveTrackRef = useRef<Track | null>(null);

  useEffect(() => {
    if (activeTrack?.id && activeTrack.id !== lastActiveTrackRef.current?.id) {
      lastActiveTrackRef.current = activeTrack;
    }
  }, [activeTrack?.id]); // Se déclenche uniquement lorsque l'ID change

  // Retourner directement la dernière piste active, pas besoin de `useState`
  return lastActiveTrackRef.current;
};
 */
/* import { useEffect, useRef } from 'react';
import { Track, useActiveTrack } from 'react-native-track-player';

export const useLastActiveTrack = () => {
  const activeTrack = useActiveTrack();
  const lastActiveTrackRef = useRef<Track | null>(null); // Référence mutable pour stocker la dernière piste active.

  useEffect(() => {
    if (activeTrack?.id && activeTrack.id !== lastActiveTrackRef.current?.id) {
      // Mise à jour de la référence uniquement si l'ID change
      lastActiveTrackRef.current = activeTrack;
    }
  }, [activeTrack?.id]); // Le hook se déclenche uniquement lorsque l'ID change

  return lastActiveTrackRef.current; // Retourne la référence, sans provoquer un re-rendu
};
 */
import { useEffect, useRef } from 'react';
import { Track, useActiveTrack } from 'react-native-track-player';

export const useLastActiveTrack = () => {
  const activeTrack = useActiveTrack(); // Récupère la piste active de TrackPlayer
  const lastActiveTrackRef = useRef<Track | null>(null); // Référence mutable pour stocker la dernière piste active

  useEffect(() => {
    if (activeTrack?.id && activeTrack.id !== lastActiveTrackRef.current?.id) {
      // Mise à jour de la référence seulement si l'ID change
      lastActiveTrackRef.current = activeTrack;
    }
  }, [activeTrack?.id]); // Dépendance uniquement sur l'ID pour éviter un cycle infini

  return lastActiveTrackRef.current; // Retourne la valeur sans provoquer de mise à jour de l'état
};
