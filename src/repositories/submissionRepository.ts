import db from "../../config/db";

export const saveSubmission = async (
  email: string,
  answers: {
    question: string;
    answer: string;
    validation: string | null;
  }[]
) => {
  return await db.tx(async (t) => {
    const id = await t.one(
      "INSERT INTO submissions (email) VALUES ($1) RETURNING id",
      [email]
    );

    const values = answers.map((answer) => {
      return t.none(
        "INSERT INTO validated_answers (submission_id, question, answer, validation) VALUES ($1, $2, $3, $4)",
        [id, answer.question, answer.answer, answer.validation]
      );
    });

    return await t.batch(values);
  });
};
