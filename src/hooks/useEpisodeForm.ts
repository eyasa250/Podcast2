// hooks/useEpisodeForm.ts
import { useState } from 'react';

export type EpisodeFormData = {
    title: string;
    description: string;
    videoData: {
      uri: string;
    } | null;
    playlist: string;
    /* audience: string;
    tags: string;
    language: string; */
  };
  

export default function useEpisodeForm() {
    const [formData, setFormData] = useState<EpisodeFormData>({
        title: '',
        description: '',
        videoData: null,
        playlist: '',
       /*  audience: '',
        tags: '',
        language: '', */
      });
      
  const updateVideoData = (uri: string) => {
    setFormData((prev) => ({
      ...prev,
      videoData: { uri},
    }));
  };

  const updateField = (field: keyof EpisodeFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
        title: '',
        description: '',
        videoData: null,
        playlist: '',
       /*  audience: '',
        tags: '',
        language: '', */
    });
  };

  return {
    formData,
    updateVideoData,
    updateField,
    resetForm,
  };
}
