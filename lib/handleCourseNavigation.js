import { coursePageUrl } from "./coursePageUrl";
import userStore from "@/store/userStore";
import useAuthModalStore from "@/store/authModalStore";

export const handleCourseNavigation = (legacyHref) => {
  const href = coursePageUrl(legacyHref);

  if (!href || href === "#") {
    return;
  }

  const user = userStore.getState().user;

  // External links should behave normally.
  if (!href.startsWith("/course/")) {
    window.location.href = href;
    return;
  }

  // Logged out → use the existing AuthModal.
  if (!user) {
    useAuthModalStore.getState().openModal();
    return;
  }

  // Logged in → let the course page/backend determine
  // whether the user has an active subscription.
  window.location.href = href;
};
