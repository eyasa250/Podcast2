import { EpisodeFormData } from "@/types";
import { useState } from "react";

export const useEpisodeForm = () => {
  const [formData, setFormDataState] = useState<EpisodeFormData>({
    title: '',
    description: '',
    trackType: 'AUDIO',
    audience: 'GENERAL',
    subtitles: false,
    soundEnhancement: false,
    tags: [],
    mediaFile: null,
    imageFile: null,
  });

  const updateField = <K extends keyof EpisodeFormData>(
    field: K,
    value: EpisodeFormData[K]
  ) => {
    setFormDataState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    formData,
    updateField,
    
  };
};
