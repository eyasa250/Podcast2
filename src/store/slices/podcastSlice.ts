import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  createPodcast,
  fetchPodcasterStats,
  fetchstastperPdcast,
  fetchViewsByCategory,
  getAllPodcasts,
  getPodcastById,
  getPodcastsByUser,
  updatePodcast,
} from "@/services/podcastApi";
import { CategoryView, Podcast, PodcasterStats, PodcastStats } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMySubscriptions } from "@/services/subscriptionApi";

type PodcastsState = {
  allpod: Podcast[];
  mine: Podcast[];
  subscriptions: Podcast[];
  selected: Podcast | null;
  selectedId: string | null;
  stats: PodcasterStats | null;
  podcastStats: PodcastStats | null;
  loading: boolean;
  error: string | null;
  viewsByCategory: CategoryView[]; // 👈 ici

};

const initialState: PodcastsState = {
  allpod: [],
  mine: [],
  subscriptions: [],
  selected: null,
  selectedId: null,
  stats: null,
  podcastStats: null,
  loading: false,
  error: null,
  viewsByCategory: [],

};

// 🔁 Récupère tous les podcasts
export const fetchAllPodcasts = createAsyncThunk("podcasts/fetchAll", async () => {
  return await getAllPodcasts();
});

// 🔁 Récupère les podcasts de l'utilisateur connecté
export const fetchMyPodcasts = createAsyncThunk("podcasts/fetchMine", async () => {
  const userJson = await AsyncStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  if (!user || !user.id) throw new Error("Utilisateur non connecté");
  return await getPodcastsByUser(user.id);
});
export const fetchStatsForPodcaster = createAsyncThunk(
  "podcasts/fetchStatsForPodcaster",
  async (_, thunkAPI) => {
    try {
      const stats = await fetchPodcasterStats();
      return stats;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur inconnue");
    }
  }
);

// 📊 Thunk pour les stats d’un podcast
export const fetchStatsForPodcast = createAsyncThunk(
  "podcasts/fetchPodcastStats",
  async (podcastId: number) => {
    return await fetchstastperPdcast(podcastId);
  }
);
// 🔁 Détail d’un podcast
export const fetchPodcastDetails = createAsyncThunk("podcasts/fetchDetails", async (id: string) => {
  return await getPodcastById(Number(id));
});

// 🔁 Ajout d’un podcast
export const addPodcast = createAsyncThunk("podcasts/add", async (formData: FormData) => {
  return await createPodcast(formData);
});
// 🔁 Modifier un podcast
export const editPodcast = createAsyncThunk(
  "podcasts/edit",
  async ({ id, formData }: { id: number; formData: FormData }) => {
    return await updatePodcast(id, formData);
  }
);

// 🔁 Abonnements de l’utilisateur
export const fetchSubscriptions = createAsyncThunk("podcasts/fetchSubscriptions", async () => {
  const res = await getMySubscriptions();
  return res.data;
});
export const fetchViewsByCategoryThunk = createAsyncThunk<
  CategoryView[], // ✅ Type de retour correct ici
  void,
  { rejectValue: string }
>("podcasts/fetchViewsByCategory", async (_, thunkAPI) => {
  try {
    const result = await fetchViewsByCategory(); // 👈 ce résultat doit être un tableau [{name: "...", value: ...}]
    return result;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur views by category");
  }
});


const podcastsSlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    clearPodcasts: (state) => {
      state.allpod = [];
      state.mine = [];
      state.subscriptions = [];
      state.selected = null;
      state.selectedId = null;
    },
    setSelectedPodcastId: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPodcasts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPodcasts.fulfilled, (state, action) => {
        state.loading = false;
        state.allpod = action.payload;
      })
      .addCase(fetchAllPodcasts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des podcasts";
      });

    builder
      .addCase(fetchMyPodcasts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyPodcasts.fulfilled, (state, action) => {
        state.loading = false;
        state.mine = action.payload;
      })
      .addCase(fetchMyPodcasts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement de mes podcasts";
      });

    builder.addCase(fetchPodcastDetails.fulfilled, (state, action) => {
      state.selected = action.payload;
    });

    builder.addCase(addPodcast.fulfilled, (state, action) => {
      state.mine.push(action.payload);
      state.allpod.unshift(action.payload);
    });
      builder.addCase(editPodcast.fulfilled, (state, action) => {
        const updated = action.payload;
        // Remplace dans `mine`
        state.mine = state.mine.map((p) => (p.id === updated.id ? updated : p));
        // Remplace aussi dans `allpod` si nécessaire
        state.allpod = state.allpod.map((p) => (p.id === updated.id ? updated : p));
      });

    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des abonnements";
      });
      builder
 builder
  .addCase(fetchStatsForPodcaster.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchStatsForPodcaster.fulfilled, (state, action) => {
    state.loading = false;
    state.stats = action.payload;
  })
  .addCase(fetchStatsForPodcaster.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Erreur stats podcasteur";
  });

builder
  .addCase(fetchStatsForPodcast.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchStatsForPodcast.fulfilled, (state, action) => {
    state.loading = false;
    state.podcastStats = action.payload;
  })
  .addCase(fetchStatsForPodcast.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || "Erreur stats podcast";
  });
builder
  .addCase(fetchViewsByCategoryThunk.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchViewsByCategoryThunk.fulfilled, (state, action) => {
    state.loading = false;
    state.viewsByCategory = action.payload;
  })
  .addCase(fetchViewsByCategoryThunk.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });

  },
});

export const { clearPodcasts, setSelectedPodcastId } = podcastsSlice.actions;
export default podcastsSlice.reducer;
