// store/slices/editPodcastSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditPodcastState {
  mode: "edit" | "create" | null;
  podcastId: string | null;
}

const initialState: EditPodcastState = {
  mode: null,
  podcastId: null,
};

const editPodcastSlice = createSlice({
  name: "editPodcast",
  initialState,
  reducers: {
    setEditPodcast(state, action: PayloadAction<EditPodcastState>) {
      state.mode = action.payload.mode;
      state.podcastId = action.payload.podcastId;
    },
    resetEditPodcast(state) {
      state.mode = null;
      state.podcastId = null;
    },
  },
});

export const { setEditPodcast, resetEditPodcast } = editPodcastSlice.actions;
export default editPodcastSlice.reducer;
