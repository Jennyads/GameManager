import { Router } from "express";

import { MatchesController } from "../controllers";
const routes = Router();


routes.get("/", MatchesController.getAllMatches)
routes.get("/:uuid",MatchesController.getUuid)
routes.post("/", MatchesController.postMatches)
routes.put("/", MatchesController.putMatch)
routes.delete("/", MatchesController.deleteMatch)

export default routes;