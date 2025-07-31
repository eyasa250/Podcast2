// hooks/useSubtitles.ts
import { useEffect, useState } from "react";
import parser from "subtitles-parser-vtt";

export interface SubtitleLine {
  start: number; // en secondes
  end: number;
  text: string;
}

export const useSubtitles = (vttUrl?: string) => {
  const [subtitles, setSubtitles] = useState<SubtitleLine[]>([]);

  useEffect(() => {
    if (!vttUrl) return;

    const fetchAndParse = async () => {
      try {
        const response = await fetch(vttUrl);
        const vttText = await response.text();
     const parsed = parser.fromVtt(vttText).map((line) => ({
  start: line.startTime / 1000,
  end: line.endTime / 1000,
  text: line.text,
}));

        setSubtitles(parsed);
      } catch (err) {
        console.error("Erreur sous-titres:", err);
      }
    };

    fetchAndParse();
  }, [vttUrl]);

  return subtitles;
};
