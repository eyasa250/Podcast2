import { Image } from "react-native-reanimated/lib/typescript/Animated";

declare module '*.png'
declare module '*.jpg'
// types.ts ou un autre fichier d'interface
export interface Episode {
    id: string;
    title: string;
    audioUrl: string;
    duration?: number;
    artwork?: string;
    podcastId?: string;
  }
  
export interface Podcast {
  id: string;
  title: string;
  description: string;
  category: string
  author: string;
  image: Image;
}

  