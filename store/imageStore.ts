import { create } from 'zustand';

type ImageStore = {
  images: string[];
  addImage: (imageUrl: string) => void;
};

export const useImageStore = create<ImageStore>((set) => ({
  images: [],
  addImage: (imageUrl) =>
    set((state) => ({
      images: [...state.images, imageUrl],
    })),
}));
