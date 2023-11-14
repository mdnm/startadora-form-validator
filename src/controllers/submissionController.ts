import { Request, Response } from "express";
//import * as submissionRepository from "../repositories/submissionRepository";
//import * as aiService from "../services/aiService";

export const validate = async (req: Request, res: Response) => {
  const { Email, ...questions } = req.body;

  try {
    const submissions = Object.entries(questions).map(([question, answer]) => {
      return { question, answer: answer as string };
    });

    console.log({
      Email,
      submissions,
    });

    return res.status(201).json({ message: "Successfully stored submission" });

    // const validatedAnswers = await aiService.validateAnswers(submissions);

    // await submissionRepository.saveSubmission(
    //   Email as string,
    //   validatedAnswers
    // );

    // res.status(201).json({ message: "Successfully stored submission" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to store submission" });
  }
};
