import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { addFavorite, getFavoriteCount, getUserFavorites, removeFavorite } from "@/services/favoritesApi";

export const useFavoriteStatus = (episodeId: number) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState<number>(0);

  useEffect(() => {
    if (episodeId) {
      getFavoriteCount(episodeId)
        .then(res => setFavoriteCount(res.data.count))
        .catch(err => console.error("Erreur nb favoris :", err));
    }

    if (user?.id) {
      getUserFavorites(user.id)
        .then(res => {
          const userFavs = res.data.map((ep: any) => ep.id); // adapte selon structure
          setIsFavorite(userFavs.includes(episodeId));
        })
        .catch(err => console.error("Erreur fav user :", err));
    }
  }, [episodeId, user]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFavorite(episodeId);
        setFavoriteCount(c => c - 1);
      } else {
        await addFavorite(episodeId);
        setFavoriteCount(c => c + 1);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Erreur changement favoris :", error);
    }
  };

  return { isFavorite, favoriteCount, toggleFavorite };
};
