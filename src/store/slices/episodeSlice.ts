// store/slices/episodesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Episode } from "@/types";
import {
  getEpisodesByPodcastId,
  uploadEpisode,
  getEpisodById,
  enhanceEpisodeSound,
  generateSubtitles,
  updateEpisode,
  getAllEpisodes,
} from "@/services/episodeApi";
import {
  getUserFavorites,
  addFavorite,
  removeFavorite,
} from "@/services/favoritesApi";
import { addView, getRecommendedEpisodes, getTotalEpisodeViews } from "@/services/viewApi";

type EpisodesState = {
  byPodcast: Episode[];
  favorites: Episode[];
  selected: Episode | null;
  loading: boolean;
  error: string | null;
    viewsByEpisodeId: { [episodeId: number]: number }; // 👈 Ajouter ici
  recommendedEpisodes: Episode[]; // 👈 ajouter ici
allEpisodes: Episode[];
};

const initialState: EpisodesState = {
  byPodcast: [],
  favorites: [],
  selected: null,
  loading: false,
  error: null,
  viewsByEpisodeId: {},
  recommendedEpisodes: [], // 👈 initialiser
  allEpisodes: [],

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
      // console.log("✅ Episodes favorites dans Redux :", data);
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
export const editEpisode = createAsyncThunk(
  'episodes/updateEpisode',
  async ({ id, data }: { id: string; data: FormData }) => {
    
        return await updateEpisode(id, data);
    
  }
);

// 🎬 Générer les sous-titres d’un épisode
export const generateEpisodeSubtitles = createAsyncThunk(
  "episodes/generateSubtitles",
  async (episodeId: number, thunkAPI) => {
    try {
      const updatedEpisode = await generateSubtitles(episodeId);
      return updatedEpisode;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Erreur lors de la génération des sous-titres");
    }
  }
);

// 🔊 Améliorer le son d’un épisode
export const enhanceEpisodeAudio = createAsyncThunk(
  "episodes/enhanceAudio",
  async (episodeId: number, thunkAPI) => {
    try {
      const updatedEpisode = await enhanceEpisodeSound(episodeId);
      return updatedEpisode;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Erreur lors de l'amélioration du son");
    }
  }
);
export const fetchEpisodeViews = createAsyncThunk(
  "episodes/fetchViews",
  async (episodeId: number, thunkAPI) => {
    try {
      const data = await getTotalEpisodeViews(episodeId);
return { episodeId, views: typeof data === 'number' ? data : data.totalViews };
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Erreur lors du chargement des vues");
    }
  }
);
export const addEpisodeView = createAsyncThunk(
  "episodes/addView",
  async (episodeId: number, { dispatch }) => {

    await addView(episodeId);
    dispatch(fetchEpisodeViews(episodeId)); // Rafraîchir les vues
  }
);
// 🔁 Récupérer les épisodes recommandés pour un utilisateur
export const fetchRecommendedEpisodes = createAsyncThunk(
  "episodes/fetchRecommended",
  async (userId: number, thunkAPI) => {
    try {
      const data = await getRecommendedEpisodes(userId);
      return data; // retourne la liste des épisodes recommandés
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Erreur lors du chargement des épisodes recommandés");
    }
  }
);
export const fetchAllEpisodes = createAsyncThunk(
  "episodes/fetchAll",
  async (_, thunkAPI) => {
    try {
      const data = await getAllEpisodes();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Erreur lors du chargement des épisodes");
    }
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
     selectEpisode: (state, action: PayloadAction<Episode>) => {
      state.selected = action.payload;
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
          // Sous-titres
    builder
      .addCase(generateEpisodeSubtitles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateEpisodeSubtitles.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
        const index = state.byPodcast.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.byPodcast[index] = action.payload;
        }
      })
      .addCase(generateEpisodeSubtitles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Amélioration audio
    builder
      .addCase(enhanceEpisodeAudio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enhanceEpisodeAudio.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
        const index = state.byPodcast.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.byPodcast[index] = action.payload;
        }
      })
      .addCase(enhanceEpisodeAudio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
builder
  .addCase(fetchEpisodeViews.fulfilled, (state, action) => {
    const { episodeId, views } = action.payload;
    state.viewsByEpisodeId[episodeId] = views;
  });
builder
  .addCase(fetchEpisodeViews.rejected, (state, action) => {
    state.error = action.payload as string;
  });
builder
  .addCase(fetchRecommendedEpisodes.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchRecommendedEpisodes.fulfilled, (state, action) => {
    state.loading = false;
    state.byPodcast = action.payload; // ou créer un champ séparé si tu veux distinguer recommandé / podcast
  })
  .addCase(fetchRecommendedEpisodes.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
builder
      .addCase(fetchAllEpisodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEpisodes.fulfilled, (state, action) => {
        state.loading = false;
        state.allEpisodes = action.payload;
      })
      .addCase(fetchAllEpisodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearEpisodes ,selectEpisode } = episodesSlice.actions;
export default episodesSlice.reducer;
