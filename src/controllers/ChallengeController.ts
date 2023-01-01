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
    const postData = req.body;
    const requirements = req.body.requirements.split(";");
    await Challenge.create({
      name: postData.name,
      rank: postData.rank,
      requirements: requirements,
    });
    const challenges = await Challenge.find({});
    return res.json({ challenges: challenges });
  },

  putChallenge: async (req: Request, res: Response) => {
    const { _id, data } = req.body;
    data.requirements = data.requirements.split(";");
    await Challenge.findOneAndUpdate({ _id: _id }, data, { new: true });
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
