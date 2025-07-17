import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slices/authSlice";
import podcastReducer from "./slices/podcastSlice";
import episodeReducer from './slices/episodeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    podcasts: podcastReducer,
    episodes: episodeReducer,


  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
