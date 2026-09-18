import QuizPage from "@/components/jlptQuiz/QuizPage";

export async function generateMetadata({ params }) {
  const { level } = await params;

  const normalizedLevel = level.toUpperCase();

  return {
    title: `${normalizedLevel} JLPT Quiz | Nihongomax`,
    description: `Test your Japanese knowledge with the ${normalizedLevel} JLPT quiz.`,
  };
}

export default async function JLPTLevelPage({ params }) {
  const { level } = await params;

  return <QuizPage level={level} />;
}
