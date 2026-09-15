import { JLPT_COURSES } from "@/data/courses/jlpt";

export function getCourseConfig(level) {
  return JLPT_COURSES.find((course) => course.slug === level.toLowerCase());
}

export function isFreeClass(level, classNumber) {
  const course = getCourseConfig(level);

  if (!course) {
    return false;
  }

  return course.freeClasses.includes(Number(classNumber));
}

export function requiresSubscription(level, classNumber) {
  return !isFreeClass(level, classNumber);
}
