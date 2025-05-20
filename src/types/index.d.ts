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
export interface Podcast {
  id: string;
  title: string;
  description: string;
  category: string
  author: string;
  image: Image;
}

  