// utils/parseVTT.ts
export const parseVTT = (vttContent: string) => {
  const cues: { start: number; end: number; text: string }[] = [];
  const regex = /(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\s+([\s\S]*?)(?=\n\n|\n*$)/g;

  const timeToSeconds = (time: string) => {
    const [h, m, s] = time.split(':');
    return Number(h) * 3600 + Number(m) * 60 + Number(s);
  };

  let match;
  while ((match = regex.exec(vttContent)) !== null) {
    cues.push({
      start: timeToSeconds(match[1]),
      end: timeToSeconds(match[2]),
      text: match[3].trim(),
    });
  }
  return cues;
};
