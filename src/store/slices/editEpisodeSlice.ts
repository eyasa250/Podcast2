// store/slices/editEpisodeSlice.ts
import { Episode } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface EditEpisodeState {
  episode: Episode | null;
}

const initialState: EditEpisodeState = {
  episode: null,
};
const editEpisodeSlice = createSlice({
  name: "editEpisode",
  initialState,
  reducers: {
    setEditEpisode: (state, action: PayloadAction<Episode>) => {
      state.episode = action.payload;
    },
    clearEditEpisode: (state) => {
      state.episode = null;
    },
  },
});
export const { setEditEpisode, clearEditEpisode } = editEpisodeSlice.actions;
export default editEpisodeSlice.reducer;
