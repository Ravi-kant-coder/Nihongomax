import userStore from "@/store/userStore";
import useAuthModalStore from "@/store/authModalStore";

export const requireAuth = (action) => {
  const { user } = userStore.getState();
  const { openModal } = useAuthModalStore.getState();

  if (!user) {
    openModal();
    return;
  }

  action();
};
