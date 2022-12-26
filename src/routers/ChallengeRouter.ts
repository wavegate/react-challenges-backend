import ChallengeController from "../controllers/ChallengeController";
import express from "express";
import checkToken from "../middleware/checkToken";

const ChallengeRouter = express.Router();

ChallengeRouter.get("/", ChallengeController.getChallenges);
ChallengeRouter.post("/", checkToken, ChallengeController.postChallenge);
ChallengeRouter.put("/", checkToken, ChallengeController.putChallenge);
ChallengeRouter.delete("/", checkToken, ChallengeController.deleteChallenge);

export default ChallengeRouter;
