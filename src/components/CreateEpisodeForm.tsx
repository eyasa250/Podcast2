import React, { useState } from 'react';

interface EpisodeFormProps {
  onSubmit: (formData: FormData) => void;
}

export default function CreateEpisodeForm({ onSubmit }: EpisodeFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [trackType, setTrackType] = useState<'AUDIO' | 'VIDEO'>('AUDIO');
  const [audience, setAudience] = useState<'GENERAL' | 'ADULT'>('GENERAL');
  const [subtitles, setSubtitles] = useState(false);
  const [soundEnhancement, setSoundEnhancement] = useState(false);
  const [tags, setTags] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('trackType', trackType);
    formData.append('audience', audience);
    formData.append('subtitles', String(subtitles));
    formData.append('soundEnhancement', String(soundEnhancement));
    formData.append('tags', JSON.stringify(tags.split(',').map(t => t.trim())));

    files.forEach(file => formData.append('files', file));

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded space-y-4">
      <h2 className="text-2xl font-bold">Créer un épisode</h2>

      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <div className="flex gap-4">
        <select value={trackType} onChange={(e) => setTrackType(e.target.value as 'AUDIO' | 'VIDEO')} className="w-full border p-2 rounded">
          <option value="AUDIO">Audio</option>
          <option value="VIDEO">Vidéo</option>
        </select>

        <select value={audience} onChange={(e) => setAudience(e.target.value as 'GENERAL' | 'ADULT')} className="w-full border p-2 rounded">
          <option value="GENERAL">Tout public</option>
          <option value="ADULT">Adulte</option>
        </select>
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={subtitles} onChange={() => setSubtitles(!subtitles)} />
          Sous-titres
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={soundEnhancement} onChange={() => setSoundEnhancement(!soundEnhancement)} />
          Amélioration sonore
        </label>
      </div>

      <input
        type="text"
        placeholder="Tags (séparés par des virgules)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="w-full"
        accept="audio/*,video/*,image/*"
        required
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
        Créer l’épisode
      </button>
    </form>
  );
}
