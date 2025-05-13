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
    artwork?: string;
    author?: string;
    episodes?: Episode[]; // Liste d'épisodes (optionnelle)
  }
  