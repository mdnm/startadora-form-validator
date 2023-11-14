import OpenAI from "openai";

const KEY = process.env.OPEN_AI_KEY || "";

// if (!KEY) {
//   throw new Error("OPEN_AI_KEY is not defined");
// }

const openai = new OpenAI({
  apiKey: KEY,
});

export const validateAnswers = async (
  submissions: { question: string; answer: string }[]
) => {
  // const completions = await Promise.all(
  //   submissions.map((submission) =>
  //     createCompletion(submission.question, submission.answer)
  //   )
  // );

  // return completions.map((completion) => {
  //   return {
  //     question: completion.question,
  //     answer: completion.answer,
  //     validation: completion.completion.choices[0].message.content,
  //   };
  // });

  return submissions.map((completion) => {
    return {
      question: completion.question,
      answer: completion.answer,
      validation: "NO VALIDATION YET",
    };
  });
};

const createCompletion = async (question: string, answer: string) => {
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [
      {
        role: "user",
        content: `
      Você é um acelerador de startups.
      Você deve analisar a resposta de integrantes de uma startup para uma determinada pergunta.
      Você deve fazer isso assim:
      1º Verifique se a resposta não foge ao tema da pergunta. 
      2º Verifique se a resposta possui lógica. 
      Caso a resposta dele fugir ao tema, ajude ele a reformular a resposta.
      Caso a resposta dele não fugir do tema, mas também não responder a pergunta, avise ele o que falta.
      Diga, ao final, se a resposta está aprovada ou não. Seja objetivo
      Se ele acertar, digite 'Parabens'

      Pergunta:
              
      ${question}
      
      Resposta do usuário:

      ${answer}

      Responda como se estivesse falando diretamente com o usuário, dizendo apenas se a resposta está correta ou o que pode melhorar, nada além disso
    `,
      },
    ],
    model: "gpt-3.5-turbo",
  };

  const completion = await openai.chat.completions.create(params);

  return {
    question,
    answer,
    completion,
  };
};
