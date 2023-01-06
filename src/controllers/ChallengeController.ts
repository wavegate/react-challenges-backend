import { Request, Response } from "express";
import Challenge from "../models/Challenge";

const ChallengeController = {
  getChallenges: async (req: Request, res: Response) => {
    const challenges = await Challenge.find({});
    return res.json({
      challenges,
    });
  },

  postChallenge: async (req: Request, res: Response) => {
    const challengeData = req.body;
    const requirements = req.body.requirements.split(";");
    const challenge = await Challenge.create({
      name: challengeData.name,
      rank: challengeData.rank,
      requirements: requirements,
    });
    return res.json({ challenge });
  },

  putChallenge: async (req: Request, res: Response) => {
    const { _id, data } = req.body;
    data.requirements = data.requirements.split(";");
    const challenge = await Challenge.findOneAndUpdate({ _id: _id }, data, {
      new: true,
    });
    return res.json({ challenge });
  },

  deleteChallenge: async (req: Request, res: Response) => {
    const { _id } = req.body;
    const challenge = await Challenge.findOneAndDelete({ _id: _id });
    return res.json({ challenge });
  },
};

export default ChallengeController;
