import { ImageCacheManager } from "./Models";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  console.error("VITE_API_BASE_URL environment variable is not set.");
}

export const imageCache = new ImageCacheManager(BASE_URL);

export const fetchAllPhotos = async (): Promise<{ id: number }[]> => {
  try {
    const response = await fetch(`${BASE_URL}/photos`);
    if (!response.ok) {
      throw new Error("Failed to fetch photos");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};

export const getImageUrl = (id: number): string => {
  return `${BASE_URL}/photos/image/${id}`;
};

export const fetchPhotoById = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/photos/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch photo");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching photo:", error);
    throw error;
  }
};

export const getCachedImageUrl = (id: number): string => {
  return imageCache.getImageUrl(id);
};

export const preloadAllImagesWithProgress = async (
  onProgress: (loaded: number, total: number, percentage: number) => void
): Promise<void> => {
  try {
    const photos = await fetchAllPhotos();
    const photoIds = photos.map((p) => p.id);

    const criticalIds = [12, 55, 101];
    await imageCache.preloadBatch(criticalIds);
    console.log("Critical homepage images loaded");

    await imageCache.preloadBatch(photoIds, (loaded, total) => {
      const percentage = Math.round((loaded / total) * 100);
      onProgress(loaded, total, percentage);
    });
  } catch (error) {
    console.error("Error in preloadAllImagesWithProgress:", error);
    throw error;
  }
};
