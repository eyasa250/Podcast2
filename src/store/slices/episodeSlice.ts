// store/slices/episodesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Episode } from "@/types";
import {
  getEpisodesByPodcastId,
  uploadEpisode,
  getEpisodById,
} from "@/services/episodeApi";
import {
  getUserFavorites,
  addFavorite,
  removeFavorite,
} from "@/services/favoritesApi";

type EpisodesState = {
  byPodcast: Episode[];
  favorites: Episode[];
  selected: Episode | null;
  loading: boolean;
  error: string | null;
};

const initialState: EpisodesState = {
  byPodcast: [],
  favorites: [],
  selected: null,
  loading: false,
  error: null,
};

// 🔁 Récupérer les épisodes d’un podcast
export const fetchEpisodesByPodcast = createAsyncThunk(
  "episodes/fetchByPodcast",
  async (podcastId: string | number) => {
    const data = await getEpisodesByPodcastId(podcastId);
    return data;
  }
);

// 🔁 Récupérer les épisodes favoris de l’utilisateur
export const fetchFavoriteEpisodes = createAsyncThunk(
  "episodes/fetchFavorites",
  async (_, thunkAPI) => {
    try {
      const data = await getUserFavorites();
      console.log("✅ Episodes favorites dans Redux :", data);
      return data;
    } catch (error) {
      console.error("❌ Erreur dans fetchFavoriteEpisodes:", error);
      return thunkAPI.rejectWithValue("Erreur lors du chargement des favoris");
    }
  }
);


// ➕ Ajouter un épisode aux favoris
export const markEpisodeAsFavorite = createAsyncThunk(
  "episodes/addToFavorites",
  async (episodeId: number, { dispatch }) => {
    await addFavorite(episodeId);
    dispatch(fetchFavoriteEpisodes()); // rafraîchir la liste
  }
);

// ➖ Retirer un épisode des favoris
export const unmarkEpisodeAsFavorite = createAsyncThunk(
  "episodes/removeFromFavorites",
  async (episodeId: number, { dispatch }) => {
    await removeFavorite(episodeId);
    dispatch(fetchFavoriteEpisodes()); // rafraîchir la liste
  }
);

// 🔁 Détails d’un épisode
export const fetchEpisodeDetails = createAsyncThunk(
  "episodes/fetchDetails",
  async (episodeId: number) => {
    return await getEpisodById(episodeId);
  }
);

// ➕ Ajouter un épisode (upload)
export const addEpisode = createAsyncThunk(
  "episodes/add",
  async ({ podcastId, formData }: { podcastId: string; formData: FormData }) => {
    return await uploadEpisode(podcastId, formData);
  }
);

const episodesSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {
    clearEpisodes: (state) => {
      state.byPodcast = [];
      state.favorites = [];
      state.selected = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodesByPodcast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEpisodesByPodcast.fulfilled, (state, action) => {
        state.loading = false;
        state.byPodcast = action.payload;
      })
      .addCase(fetchEpisodesByPodcast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des épisodes";
      });

    builder
      .addCase(fetchFavoriteEpisodes.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });

    builder
      .addCase(fetchEpisodeDetails.fulfilled, (state, action) => {
        state.selected = action.payload;
      });

    builder
      .addCase(addEpisode.fulfilled, (state, action) => {
        state.byPodcast.unshift(action.payload);
      });
  },
});

export const { clearEpisodes } = episodesSlice.actions;
export default episodesSlice.reducer;
