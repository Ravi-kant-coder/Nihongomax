import n5Questions from "./n5";
import n4Questions from "./n4";
import n3Questions from "./n3";
import n2Questions from "./n2";
import n1Questions from "./n1";

export const JLPT_QUESTIONS = {
  n5: n5Questions,
  n4: n4Questions,
  n3: n3Questions,
  n2: n2Questions,
  n1: n1Questions,
};

export const JLPT_LEVELS = [
  {
    id: "n5",
    title: "JLPT N5",
    description: "Beginner",
  },
  {
    id: "n4",
    title: "JLPT N4",
    description: "Elementary",
  },
  {
    id: "n3",
    title: "JLPT N3",
    description: "Intermediate",
  },
  {
    id: "n2",
    title: "JLPT N2",
    description: "Upper Intermediate",
  },
  {
    id: "n1",
    title: "JLPT N1",
    description: "Advanced",
  },
];
