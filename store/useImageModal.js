import { create } from "zustand";

const useImageModal = create((set) => ({
  modalImage: null,
  openModal: (src) => set({ modalImage: src }),
  closeModal: () => set({ modalImage: null }),
}));

export default useImageModal;
