import { useState } from 'react';

export type EpisodeFormData = {
  title: string;
  description: string;
  videoData: {
    uri: string;
    name: string;
  } | null;
  coverImage: {
    uri: string;
  } | null;
  audience: string;
  tags: string[];
  subtitlesEnabled: boolean;
  soundEnhancementEnabled: boolean;
  trackType: 'AUDIO' | 'VIDEO';

};

const initialFormData: EpisodeFormData = {
  title: '',
  description: '',
  videoData: null,
  coverImage: null,
  audience: 'GENERAL',
  tags: [],
  subtitlesEnabled: false,
  soundEnhancementEnabled: false,
  trackType: 'AUDIO'

};

export default function useEpisodeForm() {
  const [formData, setFormData] = useState<EpisodeFormData>(initialFormData);

  const updateVideoData = (video: { uri: string; name: string }) => {
    setFormData((prev) => ({
      ...prev,
      videoData: video,
    }));
  };

  const updateField = <K extends keyof EpisodeFormData>(field: K, value: EpisodeFormData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return {
    formData,
    updateVideoData,
    updateField,
    resetForm,
  };
}
