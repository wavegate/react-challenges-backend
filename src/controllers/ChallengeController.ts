import { Request, Response } from "express";
import Challenge from "../models/Challenge";

const ChallengeController = {
  getChallenges: async (req: Request, res: Response) => {
    const challenges = await Challenge.find({});
    const sortedChallenges = challenges.sort(
      (challenge1, challenge2) => challenge1.index - challenge2.index
    );
    return res.json({
      challenges: sortedChallenges,
    });
  },

  postChallenge: async (req: Request, res: Response) => {
    const postData = req.body;
    const requirements = req.body.requirements.split(";");
    await Challenge.create({
      index: Number(postData.index),
      name: postData.name,
      rank: postData.rank,
      requirements: requirements,
    });
    const challenges = await Challenge.find({});
    return res.json({ challenges: challenges });
  },

  putChallenge: async (req: Request, res: Response) => {
    const { _id, data } = req.body;
    await Challenge.findOneAndUpdate({ _id: _id }, { data }, { new: true });
    const challenges = await Challenge.find({});
    return res.json({ challenges: challenges });
  },

  deleteChallenge: async (req: Request, res: Response) => {
    const { _id } = req.body;
    await Challenge.findOneAndDelete({ _id: _id });
    const challenges = await Challenge.find({});
    return res.json({ challenges: challenges });
  },
};

export default ChallengeController;
