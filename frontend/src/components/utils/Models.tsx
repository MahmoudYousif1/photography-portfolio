class ImageCacheManager {
  private cache = new Map<string, HTMLImageElement>();
  private loading = new Map<string, Promise<HTMLImageElement>>();

  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async preloadImage(id: number): Promise<HTMLImageElement> {
    const key = String(id);

    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    if (this.loading.has(key)) {
      return this.loading.get(key)!;
    }

    const promise = this.loadImage(id);
    this.loading.set(key, promise);

    try {
      const img = await promise;
      this.cache.set(key, img);
      return img;
    } finally {
      this.loading.delete(key);
    }
  }

  private loadImage(id: number): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = `${this.baseUrl}/photos/image/${id}`;
    });
  }

  async preloadBatch(
    ids: number[],
    onProgress?: (loaded: number, total: number) => void
  ): Promise<void> {
    let loaded = 0;
    const promises = ids.map(async (id) => {
      try {
        await this.preloadImage(id);
      } catch {
        console.warn(`Failed to load image ${id}`);
      }
      onProgress?.(++loaded, ids.length);
    });

    await Promise.all(promises);
  }

  getImageUrl(id: number): string {
    return (
      this.cache.get(String(id))?.src ?? `${this.baseUrl}/photos/image/${id}`
    );
  }

  clear(): void {
    this.cache.clear();
    this.loading.clear();
  }
}

export { ImageCacheManager };
