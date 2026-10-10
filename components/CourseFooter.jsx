export default function CourseFooter() {
  return (
    <footer
      className="mt-8 border-t border-gray-200 px-4 py-1 md:fixed bottom-0 z-50 w-full bg-white 
     dark:bg-gray-900 dark:border-gray-700"
    >
      <p className="text-center text-xs md:text-sm leading-relaxed text-gray-800 dark:text-gray-300">
        All rights reserved @ Nihongomax © {new Date().getFullYear()}. Any
        Unauthorized copying, reproduction, or distribution will lead to legal
        action.
      </p>
    </footer>
  );
}
