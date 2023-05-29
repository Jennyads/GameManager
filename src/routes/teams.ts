import { Router } from "express";

import { TeamsController } from "../controllers";
const routes = Router();

routes.get("/", TeamsController.getAllTeams)
routes.get("/:termo", TeamsController.getTermoTeams)
routes.post("/", TeamsController.postTeams)
routes.put("/", TeamsController.putTeams)
routes.delete("/", TeamsController.deleteTeams)

export default routes;