// utils/episode/createEpisodeHandler.ts

import { EpisodeFormData } from '@/hooks/useEpisodeForm';
import { useEpisodes } from './useEpisods';

export const useEpisodeSubmission = () => {
  const { createEpisode } = useEpisodes();

  const submitEpisode = async (podcastId: string | number, formData: EpisodeFormData) => {
    try {
      const formDataToSend = new FormData();

      // 1. Créer l'objet JSON pour les métadonnées
      const episodeData = {
        title: formData.title,
        description: formData.description,
        audience: formData.audience || 'GENERAL', // Valeur par défaut
        tags: formData.tags || [], // Garantit un tableau
        subtitles: formData.subtitlesEnabled,
        soundEnhancement: formData.soundEnhancementEnabled,
        trackType: formData.trackType
      };

      // 2. Ajouter les métadonnées sous forme JSON
      formDataToSend.append('data', JSON.stringify(episodeData));

      // 3. Ajouter les fichiers
      if (formData.videoData) {
        formDataToSend.append('files', {
          uri: formData.videoData.uri,
          name: formData.videoData.name,
          type: formData.trackType === 'AUDIO' ? 'audio/mp3' : 'video/mp4',
        } as any);
      }
      
      if (formData.coverImage) {
        formDataToSend.append('files', {
          uri: formData.coverImage.uri,
          name: 'cover.jpg',
          type: 'image/jpeg',
        } as any);
      }

      await createEpisode(podcastId, formDataToSend);
    } catch (err) {
      console.error('Erreur lors de la soumission:', err);
      throw err;
    }
  };

  return { submitEpisode };
};
