// ImagePreviewModal.jsx
import useImageModal from "@/stores/useImageModal";

export default function ImagePreviewModal() {
  const { modalImage, closeModal } = useImageModal();

  if (!modalImage) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
      onClick={closeModal}
    >
      <img
        src={modalImage}
        alt="Preview"
        className="max-w-[90%] max-h-[90%] rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
