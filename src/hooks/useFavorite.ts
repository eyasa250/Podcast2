// hooks/useFavorites.ts
import { useState } from "react";
import {
  getFavoriteCount as fetchFavoriteCount,
  addFavorite as addFavoriteAPI,
  removeFavorite as removeFavoriteAPI,
  getUserFavorites as fetchUserFavorites
} from "@/services/favoritesApi";

export const useFavorites = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFavoriteCount = async (episodeId: number) => {
    try {
      setLoading(true);
      const data = await fetchFavoriteCount(episodeId);
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (episodeId: number) => {
    try {
      setLoading(true);
      await addFavoriteAPI(episodeId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (episodeId: number) => {
    try {
      setLoading(true);
      await removeFavoriteAPI(episodeId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserFavorites = async () => {
    try {
      setLoading(true);
      const data = await fetchUserFavorites();
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getFavoriteCount,
    addFavorite,
    removeFavorite,
    getUserFavorites,
  };
};
