import { Image } from "react-native-reanimated/lib/typescript/Animated";

declare module '*.png'
declare module '*.jpg'
// types.ts ou un autre fichier d'interface
export interface EpisodeFormData  {
  title: string;
  description: string;
  trackType: 'AUDIO' | 'VIDEO';
  audience: 'GENERAL' | 'ADULT';
  subtitles: boolean;
  soundEnhancement: boolean;
  tags: string[];
  mediaFile: any;
  imageFile?: any;
};
interface Episode {
  id: number;
  title: string;
  description: string;
  audioUrl: string | null;
  videoUrl: string | null;
  coverImageUrl: string;
  subtitles: boolean;
  soundEnhancement: boolean;
  transcriptionUrls: {
    [lang: string]: string; // e.g. "fr", "en", "ar"
  };
  soundEnhancementUrl: string | null;
  tags: string; // JSON string like '["dev", "audio"]'
  audience: "GENERAL" | "KIDS" | "MATURE";
  createdAt: string; // ISO date
  podcastId: number;
  trackType: "AUDIO" | "VIDEO";
  podcast: {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    userId: number;
    category: string;
  };
} 

export interface Podcast {
  id: string;
  title: string;
  description: string;
  category: string
  author: string;
  image: Image;
  userId: number,

}

  